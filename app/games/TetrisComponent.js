import { useState, useEffect, useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { Image } from "react-native-canvas";
import Canvas from "react-native-canvas";
import { encode } from "base-64";
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

class Game {
    GRIDWIDTH = 6;
    GRIDHEIGHT = 15;
    COLORS = [
        "#0000ff",
        "#00ff00",
        "#ff0000",
        "#ffff00",
    ];
    BOMBERPROB = 0.2;
    BORDERSIZE = 0.05;
    BGCOLOR = "#0078aa";
    GAMEBGCOLOR = "#88c8d9";
    SPRITES = {
        ship: `
            <svg xmlns="http://www.w3.org/2000/svg" width="700" height="200" stroke="#000000" stroke-width="6">
                <path fill="blue" d="M 697 100 h -400 l -50 -7 h -240 c 10 20 25 40 40 67 h 639 c 10 -20 11 -40 11 -60 Z"/>
                <path fill="red" d="M 686 160 h -639 l 4 10 h 629 Z"/>
                <path fill="grey" d="M 676 170 h -625 c 0 5 5 15 -20 10 c -10 0 -10 20 10 15 h 630 c 0 -10 5 -20 8 -25 Z"/>
                <path fill="white" d="M 697 100 l -20 -80 h -80 v 50 h 20 v 30 Z"/>
                <g stroke-width="4">
                    <path fill="grey" d="M 651 18 v -18 h -8 v 18"/>
                    <path fill="grey" d="M 666 18 v -10 h -8 v 10"/>
                </g>
                <g stroke-width="0" fill="darkgrey">
                    <rect x="607" y="30" width="15" height="10"/>
                    <rect x="630" y="30" width="15" height="10"/>
                    <rect x="653" y="30" width="15" height="10"/>
                </g>
            </svg>
        `,
        container: `
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <rect x="6" y="6" width="94" height="70" fill="@"/>
                <rect x="6" y="82" width="94" height="12" fill="#7f7f7f"/>
                <g fill="#000000">
                    <path d="M 100 0 v 6 h -94 v 88 h 94 v 6 h -94 c -5 0 -6 -1 -6 -6 v -88 c 0 -5 1 -6 6 -6 Z"/>
                    <rect x="6" y="76" width="94" height="6"/>
                    <rect x="18" y="82" width="6" height="12"/>
                    <circle cx="12" cy="88" r="3"/>
                </g>
                <g stroke-width="6" stroke-linecap="round" stroke="#000000">
                    <line x1="48" y1="88" x2="88" y2="88"/>
                    <line x1="16" y1="15" x2="16" y2="67"/>
                    <line x1="28" y1="15" x2="28" y2="67"/>
                    <line x1="40" y1="15" x2="40" y2="67"/>
                    <line x1="52" y1="15" x2="52" y2="67"/>
                    <line x1="64" y1="15" x2="64" y2="67"/>
                    <line x1="76" y1="15" x2="76" y2="67"/>
                    <line x1="88" y1="15" x2="88" y2="67"/>
                    <line x1="100" y1="15" x2="100" y2="67"/>
                </g>
            </svg>
        `,
        star: /*`
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" fill="#ffffff"/>
                <circle cx="42" cy="58" r="30"/>
                <path stroke-width="4" stroke-linecap="round" stroke="#ffffff" d="M 22 58 c 0 -10 10 -20 20 -20"/>
                <path fill="#000000" d="M 57 33 l 2 -2 c 2 -2 4 -2 6 0 l 4 4 c 2 2 2 4 0 6 l -2 2"/>
                <path fill="rgba(0,0,0,0)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke="#000000" d="M 67 33 c 4 -4 8 -4 12 0 c 1 1 4 1 6 0"/>
            </svg>
        `*/`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path stroke="#000000" stroke-width="2" stroke-linejoin="round" fill="#ff0" d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"/>
            </svg>
        `,
        arrow: `
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <path fill="#ffffff" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" d="M 50 5 L 75 30 H 55 V 95 H 45 V 30 H 25 Z"/>
            </svg>
        `,
        turn: `
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
                <path fill="#ffffff" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" d="M 15 30 L 40 5 V 25 C 80 25 85 45 85 60 C 85 75 75 90 40 90 h -15 v -10 h 15 C 65 80 75 75 75 60 C 75 45 65 35 40 35 V 55 Z"/>
            </svg>
        `,
    };


    constructor(canvas, handleEnd, requiredScore) {
        this.canvas = canvas;
        this.handleEnd = handleEnd;
        this.requiredScore = requiredScore;
        this.ctx = this.canvas.getContext("2d");
        this.sprites = {
            containers: {},
        };
        this.sprites.ship = new Image(canvas);
        this.sprites.ship.src = "data:image/svg+xml;base64,"+encode(this.SPRITES.ship);
        for (let color of this.COLORS) {
            let svg = this.SPRITES.container;
            let i = svg.indexOf("@");
            svg = svg.slice(0, i)+color+svg.slice(i+1);
            this.sprites.containers[color] = new Image(canvas);
            this.sprites.containers[color].src = "data:image/svg+xml;base64,"+encode(svg);
        }
        this.sprites.star = new Image(canvas);
        this.sprites.star.src = "data:image/svg+xml;base64,"+encode(this.SPRITES.star);
        this.sprites.arrow = new Image(canvas);
        this.sprites.arrow.src = "data:image/svg+xml;base64,"+encode(this.SPRITES.arrow);
        this.sprites.turn = new Image(canvas);
        this.sprites.turn.src = "data:image/svg+xml;base64,"+encode(this.SPRITES.turn);
        this.accelerate = false;
        this.ajustSize();
        this.init();
        this.run();
    }

    ajustSize() {
        this.tileSize = this.canvas.width/(this.GRIDWIDTH+3);
        if (this.canvas.height/(this.GRIDHEIGHT-1) < this.tileSize) {this.tileSize = this.canvas.height/(this.GRIDHEIGHT-1);}
        this.gameCoords = {
            x: (this.canvas.width-this.tileSize*(this.GRIDWIDTH+3))/2,
            y: 0,
        };
    }

    init() {
        this.running = true;
        this.grid = [];
        for (let y = 0; y < this.GRIDHEIGHT; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.GRIDWIDTH; x++) {this.grid[y][x] = null;}
        }
        this.anim = 0;
        this.next = this.createContainer();
        this.score = 0;
        this.spawnContainer();
        this.displayBackground();
        this.displayNext();
    }

    run() {
        if (this.running) {
            let wasStopped = false;
            let wasMoved = false;
            let wasChanged = false;
            for (let y = this.GRIDHEIGHT-1; y >= 0; y--) {
                for (let x = 0; x < this.GRIDWIDTH; x++) {
                    let part = this.grid[y][x];
                    if (part) {
                        if (this.anim > 1) {
                            if (part.mustBeDestroyed) {
                                for (let coords of [[x, y-1], [x+1, y], [x, y+1], [x-1, y]]) {
                                    if (0 <= coords[0] && coords[0] < this.GRIDWIDTH && 0 <= coords[1] && coords[1] < this.GRIDHEIGHT && this.grid[coords[1]][coords[0]] && this.grid[coords[1]][coords[0]].color === part.color) {
                                        this.grid[coords[1]][coords[0]].mustBeDestroyed = true;
                                    }
                                }
                                this.score++;
                                this.grid[y][x] = null;
                                this.clearContainerPart(x, y);
                                wasChanged = true;
                            }
                            else if (part.bomber) {
                                for (let coords of [[x, y-1], [x+1, y], [x, y+1], [x-1, y]]) {
                                    if (0 <= coords[0] && coords[0] < this.GRIDWIDTH && 0 <= coords[1] && coords[1] < this.GRIDHEIGHT && this.grid[coords[1]][coords[0]] && this.grid[coords[1]][coords[0]].color === part.color) {
                                        this.grid[y][x].mustBeDestroyed = true;
                                        break;
                                    }
                                }
                                if (part.mustBeDestroyed) {wasChanged = true;}
                            }
                        }
                        else {
                            if (this.freeTile(x, y+1)) {
                                if (this.anim < 2) {
                                    if (this.anim === 0) {
                                        if (x === this.container.x0 && y === this.container.y0) {this.container.y0++;}
                                        else if (x === this.container.x1 && y === this.container.y1) {this.container.y1++;}
                                    }
                                    this.grid[y+1][x] = {...this.grid[y][x]};
                                    this.grid[y][x] = null;
                                    if (this.freeTile(x, y-1)) {this.clearContainerPart(x, y);}
                                    this.displayContainerPart(x, y+1, part);
                                }
                                wasMoved = true;
                            }
                            else if (this.anim === 0 && (x === this.container.x0 && y === this.container.y0 || x === this.container.x1 && y === this.container.y1)) {wasStopped = true;}
                        }
                    }
                }
            }
            if (this.anim === 0 && wasStopped) {this.anim = 1;}
            else if (this.anim === 1 && !wasMoved) {this.anim = 2;}
            else if (this.anim === 2) {
                if (wasChanged) {this.anim = 3;}
                else if (this.score >= this.requiredScore || this.grid[1][parseInt(this.GRIDWIDTH/2)]) {
                    this.running = false;
                    this.displayGameOver();
                    this.handleEnd(this.score);
                }
                else {
                    this.spawnContainer();
                    this.displayNext();
                    this.anim = 0;
                }
            }
            else if (this.anim === 3 && !wasChanged) {this.anim = 1;}
            if (this.running) {
                this.displayScore();
                setTimeout(() => this.run(), this.anim === 0 ? 500 : 100);
            }
        }
    }

    createContainer() {
        return {
            part0: {
                side: 2,
                reverse: false,
                color: parseInt(Math.random()*this.COLORS.length),
                bomber: Math.random() < this.BOMBERPROB,
            },
            part1: {
                side: 0,
                reverse: true,
                color: parseInt(Math.random()*this.COLORS.length),
                bomber: Math.random() < this.BOMBERPROB,
            },
        };
    }

    spawnContainer() {
        let part0 = this.next.part0;
        let part1 = this.next.part1;
        let x = parseInt(this.GRIDWIDTH/2);
        this.grid[0][x] = part0;
        this.grid[1][x] = part1;
        this.next = this.createContainer();
        this.container = {
            x0: x,
            y0: 0,
            x1: x,
            y1: 1,
        };
    }

    freeTile(x, y) {
        return 0 <= x && x < this.GRIDWIDTH && 0 <= y && y < this.GRIDHEIGHT && this.grid[y][x] === null;
    }

    move(n) {
        if (this.anim === 0 && (
                this.container.x0+n === this.container.x1 && this.container.y0 === this.container.y1 ||
                this.freeTile(this.container.x0+n, this.container.y0)
            ) && (
                this.container.x1+n === this.container.x0 && this.container.y1 === this.container.y0 ||
                this.freeTile(this.container.x1+n, this.container.y1)
            )
        ) {
            this.clearContainerPart(this.container.x0, this.container.y0);
            this.clearContainerPart(this.container.x1, this.container.y1);
            if (n === -1 && this.container.x0 < this.container.x1 || n === 1 && this.container.x0 > this.container.x1) {
                this.grid[this.container.y0][this.container.x0+n] = {...this.grid[this.container.y0][this.container.x0]};
                this.grid[this.container.y0][this.container.x0] = null;
                this.grid[this.container.y1][this.container.x1+n] = {...this.grid[this.container.y1][this.container.x1]};
                this.grid[this.container.y1][this.container.x1] = null;
            }
            else {
                this.grid[this.container.y1][this.container.x1+n] = {...this.grid[this.container.y1][this.container.x1]};
                this.grid[this.container.y1][this.container.x1] = null;
                this.grid[this.container.y0][this.container.x0+n] = {...this.grid[this.container.y0][this.container.x0]};
                this.grid[this.container.y0][this.container.x0] = null;
            }
            this.container.x0 += n;
            this.container.x1 += n;
            this.displayContainerPart(this.container.x0, this.container.y0, this.grid[this.container.y0][this.container.x0]);
            this.displayContainerPart(this.container.x1, this.container.y1, this.grid[this.container.y1][this.container.x1]);
        }
    }

    moveLeft() {this.move(-1);}

    moveRight() {this.move(1);}

    moveDown() {
        if (this.anim === 0) {
            if ((this.container.y0 === this.container.y1-1 || this.freeTile(this.container.x0, this.container.y0+1)) && (this.container.y1 === this.container.y0-1 || this.freeTile(this.container.x1, this.container.y1+1))) {
                this.clearContainerPart(this.container.x0, this.container.y0);
                this.clearContainerPart(this.container.x1, this.container.y1);
                if (this.container.y0 < this.container.y1) {
                    this.grid[this.container.y1+1][this.container.x1] = {...this.grid[this.container.y1][this.container.x1]};
                    this.grid[this.container.y1][this.container.x1] = null;
                    this.grid[this.container.y0+1][this.container.x0] = {...this.grid[this.container.y0][this.container.x0]};
                    this.grid[this.container.y0][this.container.x0] = null;
                }
                else {
                    this.grid[this.container.y0+1][this.container.x0] = {...this.grid[this.container.y0][this.container.x0]};
                    this.grid[this.container.y0][this.container.x0] = null;
                    this.grid[this.container.y1+1][this.container.x1] = {...this.grid[this.container.y1][this.container.x1]};
                    this.grid[this.container.y1][this.container.x1] = null;
                }
                this.container.y0++;
                this.container.y1++;
                this.displayContainerPart(this.container.x0, this.container.y0, this.grid[this.container.y0][this.container.x0]);
                this.displayContainerPart(this.container.x1, this.container.y1, this.grid[this.container.y1][this.container.x1]);
            }
        }
    }

    turn(n) {
        if (this.anim === 0) {
            let valid = false;
            let x, y;
            let side = this.grid[this.container.y0][this.container.x0].side;
            while (!valid) {
                side += n;
                if (side < 0) {side = 3;}
                else if (side > 3) {side = 0;}
                x = this.container.x0;
                y = this.container.y0;
                switch (side) {
                    case 0: y--; break;
                    case 1: x++; break;
                    case 2: y++; break;
                    case 3: x--; break;
                }
                valid = side === 0 || x === this.container.x1 && y === this.container.y1 || this.freeTile(x, y);
            }
            if (x != this.container.x1 && y != this.container.y1) {
                this.clearContainerPart(this.container.x0, this.container.y0);
                this.clearContainerPart(this.container.x1, this.container.y1);
                this.grid[y][x] = {...this.grid[this.container.y1][this.container.x1]};
                this.grid[this.container.y1][this.container.x1] = null;
                this.container.x1 = x;
                this.container.y1 = y;
                this.grid[this.container.y0][this.container.x0].side = side;
                side += 2;
                if (side < 0) {side += 4;}
                else if (side > 3) {side -= 4;}
                this.grid[y][x].side = side;
                this.displayContainerPart(this.container.x0, this.container.y0, this.grid[this.container.y0][this.container.x0]);
                this.displayContainerPart(this.container.x1, this.container.y1, this.grid[this.container.y1][this.container.x1]);
            }
        }
    }

    turnLeft() {this.turn(-1);}

    turnRight() {this.turn(1);}

    displayRect(x, y, width, height, color) {
        let sx = this.gameCoords.x+this.tileSize*x;
        let sy = this.gameCoords.y+this.tileSize*y;
        let ex = sx+this.tileSize*width;
        let ey = sy+this.tileSize*height;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(sx, sy, ex-sx, ey-sy);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(sx, sy, ex-sx, this.tileSize*this.BORDERSIZE);
        this.ctx.fillRect(ex-this.tileSize*this.BORDERSIZE, sy, this.tileSize*this.BORDERSIZE, ey-sy);
        this.ctx.fillRect(sx, ey-this.tileSize*this.BORDERSIZE, ex-sx, this.tileSize*this.BORDERSIZE);
        this.ctx.fillRect(sx, sy, this.tileSize*this.BORDERSIZE, ey-sy);
    }

    displayImage(image, x, y, width, height, rotate, reverse) {
        this.ctx.save();
        this.ctx.translate(this.gameCoords.x+x*this.tileSize, this.gameCoords.y+y*this.tileSize);
        if (reverse) {this.ctx.scale(-1, 1);}
        if (rotate) {this.ctx.rotate(rotate);}
        this.ctx.drawImage(image, -width*this.tileSize/2, -height*this.tileSize/2, width*this.tileSize, height*this.tileSize);
        this.ctx.restore();
    }

    displayBackground() {
        this.ctx.fillStyle = this.BGCOLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.displayRect(0, 0, this.GRIDWIDTH, this.GRIDHEIGHT-2, this.GAMEBGCOLOR);
        this.ctx.fillStyle = this.GAMEBGCOLOR;
        this.ctx.fillRect(this.gameCoords.x+this.tileSize*parseInt(this.GRIDWIDTH/2), this.gameCoords.y, this.tileSize, this.tileSize*this.BORDERSIZE*2);
        this.displayRect(this.GRIDWIDTH+0.5, 1, 2, 3, this.GAMEBGCOLOR);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = (this.tileSize*0.5).toString()+"px Sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Suivant :", this.gameCoords.x+this.tileSize*(this.GRIDWIDTH+1.5), this.gameCoords.y+this.tileSize*0.7);
        this.ctx.fillText("Score :", this.gameCoords.x+this.tileSize*(this.GRIDWIDTH+1.5), this.gameCoords.y+this.tileSize*5.7);
        this.ctx.drawImage(this.sprites.ship, this.gameCoords.x, this.gameCoords.y+this.tileSize*12, this.tileSize*7, this.tileSize*2);
    }

    displayScore() {
        this.ctx.fillStyle = this.BGCOLOR;
        this.ctx.fillRect(this.gameCoords.x+this.tileSize*(this.GRIDWIDTH+0.5), this.gameCoords.y+this.tileSize*6, this.tileSize*2, this.tileSize);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = (this.tileSize*0.5).toString()+"px Sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.score.toString(), this.gameCoords.x+this.tileSize*(this.GRIDWIDTH+1.5), this.gameCoords.y+this.tileSize*6.7);
    }

    displayNext() {
        this.displayContainerPart(this.GRIDWIDTH+1, 3.5, this.next.part0);
        this.displayContainerPart(this.GRIDWIDTH+1, 4.5, this.next.part1);
    }

    clearContainerPart(x, y) {
        x = this.gameCoords.x+this.tileSize*x;
        y = this.gameCoords.y+this.tileSize*(y-2);
        this.ctx.fillStyle = this.GAMEBGCOLOR;
        this.ctx.fillRect(x-1, y-1, this.tileSize+2, this.tileSize+2);
    }

    displayContainerPart(x, y, part) {
        this.displayImage(this.sprites.containers[this.COLORS[part.color]], x+0.5, y-1.5, 1, 1, part.reverse ? -Math.PI*(part.side*0.5+0.5) : Math.PI*(part.side*0.5-0.5), part.reverse);
        if (part.bomber) {
            switch (part.side) {
                case 0: x += 0.1*(part.reverse*2-1); break;
                case 1: y += 0.1*(part.reverse*2-1); break;
                case 2: x -= 0.1*(part.reverse*2-1); break;
                case 3: y -= 0.1*(part.reverse*2-1); break;
            }
            this.displayImage(this.sprites.star, x+0.5, y-1.5, 0.5, 0.5, part.reverse ? Math.PI*(part.side*0.5+0.5) : Math.PI*(part.side*0.5-0.5));
        }
    }

    displayGameOver() {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "#fff";
        this.ctx.fillText("Vous avez obtenu un score de "+this.score, this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillStyle = "#ff0000";
        this.ctx.font = this.tileSize.toString()+"px Sans-serif";
        this.ctx.fillText("GAME OVER", this.canvas.width/2, this.canvas.height/2-this.tileSize);
    }
};

const width = Dimensions.get('window').width-80;
const height = Dimensions.get('window').height*0.6;

export default function TetrisComponent({id, handleEnd}) {
    const navigation = useNavigation();

    const ref = useRef(null);

    const [game, setGame] = useState(null);
    const [over, setOver] = useState(false);

    const requiredScore = 20;

    useEffect(() => {
        if (ref.current) {
            ref.current.width = width;
            ref.current.height = height;
        }
    }, [ref]);

    const handlePlay = () => {
        setOver(false);
        if (game === null) {setGame(new Game(ref.current, handleGameOver, requiredScore));}
        else {
            game.init();
            game.run();
        }
    };

    const handleGameOver = (score) => {
        setOver(true);
        handleEnd(score);
    };

    return (
        <View style={{
            alignItems: 'center',
            gap:        10,
        }}>
            <View>
                <Canvas ref={ ref } width={ width } height={ height } style={{ backgroundColor: '#000' }}/>
            </View>
            {
                game && !over
                ? null
                : (
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '50%',
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        {over ? <Button center={ true } onPress={ () => navigation.navigate('Map') }>Retour à la carte</Button> : null}
                        <Button center={ true } onPress={ handlePlay }>{over ? 'Rejouer au mini-jeu' : 'Jouer au mini-jeu'}</Button>
                    </View>
                )
            }
            {
                game
                ? <View style={{
                    flexDirection:  'row',
                    justifyContent: 'space-between',
                    width:          '100%',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap:           10,
                    }}>
                        <Button type='light' size='lg' icon='arrow-left' onPress={ () => game.moveLeft() }/>
                        <Button type='light' size='lg' icon='arrow-right' onPress={ () => game.moveRight() }/>
                        <Button type='light' size='lg' icon='arrow-down' onPress={ () => game.moveDown() }/>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        gap:           10,
                    }}>
                        <Button type='light' size='lg' icon='rotate-ccw' onPress={ () => game.turnLeft() }/>
                        <Button type='light' size='lg' icon='rotate-cw' onPress={ () => game.turnRight() }/>
                    </View>
                </View>
                : null
            }
        </View>
    );
}