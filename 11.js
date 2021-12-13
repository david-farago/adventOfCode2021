const {strictEqual} = require("assert");

const input = '5433566276,6376253438,8458636316,6253254525,7211137138,1411526532,5788761424,8677841514,1622331631,5876712227';
const example = '5483143223,2745854711,5264556173,6141336146,6357385478,4167524645,2176841721,6882881134,4846848554,5283751526';

const energyLevels = {
    flashCount: 0,
    levels: {},
    propagateEnergy(coords) {
        const [rowIndex, colIndex] = coords.split('_').map(s => parseInt(s, 10));
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                if (this.levels[`${rowIndex + rowOffset}_${colIndex + colOffset}`] && (rowOffset !== 0 || colOffset !== 0)) {
                    this.levels[`${rowIndex + rowOffset}_${colIndex + colOffset}`].energyLevel++;
                }
            }
        }
    },
    gainEnergy() {
        for (let coords in this.levels) {
            if (this.levels[coords].energyLevel <= 9) {
                this.levels[coords].energyLevel++;
            }
        }
    },
    flash() {
        let flashed = false;
        for (const coords in this.levels) {
            if (this.levels[coords].energyLevel > 9 && !this.levels[coords].flashed) {
                this.levels[coords].flashed = true;
                this.flashCount++;
                flashed = true;

                this.propagateEnergy(coords);
            }
        }

        return flashed;
    },
    reset() {
        for (const coords in this.levels) {
            if (this.levels[coords].flashed) {
                this.levels[coords].energyLevel = 0;
                this.levels[coords].flashed = false;
            }
        }
    }
};

strictEqual(partOne(example), 1656);
strictEqual(partTwo(example), 195);

function partOne(input) {
    input.split(',').map(row => row.split('')).forEach((row, rowIndex) => {
        row.forEach((energyLevel, colIndex) => {
            energyLevels.levels[`${rowIndex}_${colIndex}`] = {energyLevel: parseInt(energyLevel, 10), flashed: false};
        });
    });

    let hasNewFlashes;

    for (let step = 1; step <= 100; step++) {
        energyLevels.gainEnergy();
        do {
            hasNewFlashes = energyLevels.flash();
        } while (hasNewFlashes)

        energyLevels.reset();
    }
    return energyLevels.flashCount;
}

function partTwo(input) {
    input.split(',').map(row => row.split('')).forEach((row, rowIndex) => {
        row.forEach((energyLevel, colIndex) => {
            energyLevels.levels[`${rowIndex}_${colIndex}`] = {energyLevel: parseInt(energyLevel, 10), flashed: false};
        });
    });

    let hasNewFlashes;

    let allFlashed = false;
    let step = 0;
    do {
        step++;
        energyLevels.gainEnergy();
        do {
            hasNewFlashes = energyLevels.flash();
        } while (hasNewFlashes)

        if (energyLevels.flashCount === Object.keys(energyLevels.levels).length) {
            allFlashed = true;
        }
        energyLevels.flashCount = 0;

        energyLevels.reset();
    } while (!allFlashed)

    return step;
}

console.log(partOne(input))
console.log(partTwo(input))
