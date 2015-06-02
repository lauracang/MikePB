/*

This file is modified from modbus-master.

modbus-master is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

modbus-master is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with modbus-master.  If not, see <http://www.gnu.org/licenses/>.

*/

#include <stdint.h>
#include <string.h>

#include "crc16.h"

static const uint16_t tab[256] = {
	0x0000, 0x9705, 0x2e01, 0xb904, 0x5c02, 0xcb07, 0x7203, 0xe506,
	0xb804, 0x2f01, 0x9605, 0x0100, 0xe406, 0x7303, 0xca07, 0x5d02,
	0x7003, 0xe706, 0x5e02, 0xc907, 0x2c01, 0xbb04, 0x0200, 0x9505,
	0xc807, 0x5f02, 0xe606, 0x7103, 0x9405, 0x0300, 0xba04, 0x2d01,
	0xe006, 0x7703, 0xce07, 0x5902, 0xbc04, 0x2b01, 0x9205, 0x0500,
	0x5802, 0xcf07, 0x7603, 0xe106, 0x0400, 0x9305, 0x2a01, 0xbd04,
	0x9005, 0x0700, 0xbe04, 0x2901, 0xcc07, 0x5b02, 0xe206, 0x7503,
	0x2801, 0xbf04, 0x0600, 0x9105, 0x7403, 0xe306, 0x5a02, 0xcd07,
	0xc007, 0x5702, 0xee06, 0x7903, 0x9c05, 0x0b00, 0xb204, 0x2501,
	0x7803, 0xef06, 0x5602, 0xc107, 0x2401, 0xb304, 0x0a00, 0x9d05,
	0xb004, 0x2701, 0x9e05, 0x0900, 0xec06, 0x7b03, 0xc207, 0x5502,
	0x0800, 0x9f05, 0x2601, 0xb104, 0x5402, 0xc307, 0x7a03, 0xed06,
	0x2001, 0xb704, 0x0e00, 0x9905, 0x7c03, 0xeb06, 0x5202, 0xc507,
	0x9805, 0x0f00, 0xb604, 0x2101, 0xc407, 0x5302, 0xea06, 0x7d03,
	0x5002, 0xc707, 0x7e03, 0xe906, 0x0c00, 0x9b05, 0x2201, 0xb504,
	0xe806, 0x7f03, 0xc607, 0x5102, 0xb404, 0x2301, 0x9a05, 0x0d00,
	0x8005, 0x1700, 0xae04, 0x3901, 0xdc07, 0x4b02, 0xf206, 0x6503,
	0x3801, 0xaf04, 0x1600, 0x8105, 0x6403, 0xf306, 0x4a02, 0xdd07,
	0xf006, 0x6703, 0xde07, 0x4902, 0xac04, 0x3b01, 0x8205, 0x1500,
	0x4802, 0xdf07, 0x6603, 0xf106, 0x1400, 0x8305, 0x3a01, 0xad04,
	0x6003, 0xf706, 0x4e02, 0xd907, 0x3c01, 0xab04, 0x1200, 0x8505,
	0xd807, 0x4f02, 0xf606, 0x6103, 0x8405, 0x1300, 0xaa04, 0x3d01,
	0x1000, 0x8705, 0x3e01, 0xa904, 0x4c02, 0xdb07, 0x6203, 0xf506,
	0xa804, 0x3f01, 0x8605, 0x1100, 0xf406, 0x6303, 0xda07, 0x4d02,
	0x4002, 0xd707, 0x6e03, 0xf906, 0x1c00, 0x8b05, 0x3201, 0xa504,
	0xf806, 0x6f03, 0xd607, 0x4102, 0xa404, 0x3301, 0x8a05, 0x1d00,
	0x3001, 0xa704, 0x1e00, 0x8905, 0x6c03, 0xfb06, 0x4202, 0xd507,
	0x8805, 0x1f00, 0xa604, 0x3101, 0xd407, 0x4302, 0xfa06, 0x6d03,
	0xa004, 0x3701, 0x8e05, 0x1900, 0xfc06, 0x6b03, 0xd207, 0x4502,
	0x1800, 0x8f05, 0x3601, 0xa104, 0x4402, 0xd307, 0x6a03, 0xfd06,
	0xd007, 0x4702, 0xfe06, 0x6903, 0x8c05, 0x1b00, 0xa204, 0x3501,
	0x6803, 0xff06, 0x4602, 0xd107, 0x3401, 0xa304, 0x1a00, 0x8d05
};

void crc16Reset(crc16_t *c) {
	c->v = 0xffff;
}

void crc16Update(crc16_t *c, const uint8_t v) {
	c->v = tab[c->b.lo ^ v] ^ c->b.hi;
}

void crc16UpdateN(crc16_t *c, const uint8_t *buf, const size_t n) {
	size_t i;
	for (i = 0; i < n; i++) {
		crc16Update(c, buf[i]);
	}
}
