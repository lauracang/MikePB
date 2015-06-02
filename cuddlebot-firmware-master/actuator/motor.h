/*

Cuddlebot actuator firmware - Copyright (C) 2014 Michael Phan-Ba

Property of SPIN Research Group
ICICS/CS Building X508-2366 Main Mall
Vancouver, B.C. V6T 1Z4 Canada
(604) 822 8169 - maclean@cs.ubc.ca

*/

#ifndef _MOTOR_H_
#define _MOTOR_H_

#include <ch.h>
#include <hal.h>

/* Motor flag to inverse position calculation. */
#define MOTOR_INVERSE         0x01

/* Motor driver state. */
typedef struct {
  pwmcnt_t pwmoffset;                   // minimum PWM to move motor
  int8_t pwmstate;                      // last PWM value
  int8_t flags;                         // motor flags
  float offset;                         // position offset
  float hibound;                        // calibrated upper bound
} MotorDriver;

/* Motor driver instance. */
extern MotorDriver MD1;

/* Get calibrated lower bound. */
#define motorLoBound() (0)

/* Get calibrated upper bound. */
#define motorHiBound() (MD1.hibound)

/* Initialize motor driver. */
void motorInit(void);

/*

Initialize motor driver object.

@param mdp Motor driver

*/
void motorObjectInit(MotorDriver *mdp);

/* Start motor driver. */
void motorStart(void);

/* Stop motor driver. */
void motorStop(void);

/* Calibrate motor driver. */
void motorCalibrate(void);

/*

Set motor output.

@param p integer between -127 and 127

*/
void motorSet(int8_t p);

/*

Set motor output in interrupt handler.

@param p integer between -127 and 127

*/
void motorSetI(int8_t p);

/*

Get motor output.

@return Integer between -127 and 127

*/
#define motorGetI() (MD1.pwmstate)

/* Get motor mosition, in radians between [-π, π]. */
float motorPosition(void);

/* Get motor calibrated position, in radians between [0, 2π]. */
float motorCPosition(void);

#endif /* _MOTOR_H_ */
