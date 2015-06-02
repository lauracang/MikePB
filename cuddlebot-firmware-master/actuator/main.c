/*

Cuddlebot actuator firmware - Copyright (C) 2014 Michael Phan-Ba

Property of SPIN Research Group
ICICS/CS Building X508-2366 Main Mall
Vancouver, B.C. V6T 1Z4 Canada
(604) 822 8169 - maclean@cs.ubc.ca

----

ChibiOS/RT - Copyright (C) 2006-2013 Giovanni Di Sirio

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

#include <math.h>

#include <ch.h>
#include <hal.h>
#include <chprintf.h>

#include "addr.h"
#include "comm.h"
#include "motion.h"
#include "motor.h"
#include "pid.h"
#include "render.h"
#include "render_pid.h"
#include "render_ps.h"
#include "rs485.h"

#define SETPOINT_BUF_SIZE               1024
#define SETPOINT_BUF_COUNT              8

static uint8_t sp_memory_buf[SETPOINT_BUF_COUNT *SETPOINT_BUF_SIZE];
static msg_t sp_mailbox_buf[SETPOINT_BUF_COUNT];
static MEMORYPOOL_DECL(sp_memory_pool, SETPOINT_BUF_SIZE, NULL);
static MAILBOX_DECL(sp_mailbox, sp_mailbox_buf, SETPOINT_BUF_COUNT);
static WORKING_AREA(sp_thread_wa, 128);

PIDConfig pidcfg = {
	.kp = 100.0,
	.ki = 0.0,
	.kd = 2.0,
	.setpoint = 2.0,
	.frequency = 1000
};

MotionConfig motioncfg = {
	.pool = &sp_memory_pool,
	.mbox = &sp_mailbox,
	.thread_wa = sp_thread_wa,
	.thread_wa_size = sizeof(sp_thread_wa),
	.thread_prio = HIGHPRIO
};

CommConfig commcfg = {
	.pool = &sp_memory_pool,
	.mbox = &sp_mailbox,
	.object_size = SETPOINT_BUF_SIZE,
	.io = { .rsdp = &RSD3 }
};

/* Application entry point. */
int main(void) {
	// initialize the system
	// - HAL: initialize the configured device drivers and perform
	//   board-specific initializations
	// - Kernel: the main() function becomes a thread and the RTOS is
	//   active
	halInit();
	chSysInit();

	// read board address
	addrLoad();

	// halt system if address is invalid
	if (addrGet() == ADDR_INVALID) {
		chSysHalt();
	}

	// initialize and start the motor driver
	// - PWM: initialize with configuration for purr or Maxon motors
	// - motor driver and position sensor ICs are activated
	// - position sensor is calibrated
	motorInit();
	motorStart();
	if (!addrIsPurr()) {
		motorCalibrate();
	}

	// initialize render driver
	if (addrIsPurr()) {
		psrdObjectInit(&PSRENDER1);
		motioncfg.render = (BaseRenderDriver *)&PSRENDER1;
	} else {
		pidrdObjectInit(&PIDRENDER1);
		pidrdStart(&PIDRENDER1, &pidcfg);
		motioncfg.render = (BaseRenderDriver *)&PIDRENDER1;
	}

	// initialize setpoint buffers
	chPoolLoadArray(&sp_memory_pool, sp_memory_buf, SETPOINT_BUF_COUNT);

	// start motion driver
	motionInit();
	motionStart(&MOTION2, &motioncfg);

	// start serial driver
	rs485Init();
	rs485Start(&RSD3);

	// start comm driver
	commInit();
	commStart(&COMM1, &commcfg);

	// typed channels
	BaseChannel *chnp = (BaseChannel *)&RSD3;
	// BaseSequentialStream *chp = (BaseSequentialStream *)&RSD3;

	palSetPadMode(GPIOB, GPIOB_LED0, PAL_MODE_OUTPUT_PUSHPULL);
	// palSetPadMode(GPIOB, GPIOB_LED1, PAL_MODE_OUTPUT_PUSHPULL);
	palClearPad(GPIOB, GPIOB_LED0);
	// palClearPad(GPIOB, GPIOB_LED1);

	// ignore anomalous '\0' char
	chnGetTimeout(chnp, MS2ST(1));

	for (;;) {
		// handle commands
		if (commHandle(&COMM1) < RDY_OK) {
			palSetPad(GPIOB, GPIOB_LED0);
		} else {
			palClearPad(GPIOB, GPIOB_LED0);
		}
	}

	return 0;
}
