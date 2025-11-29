export function doTimesOverlap(startA, durationA, startB, durationB) {
    const [hA, mA] = startA.split(":").map(Number);
    const [hB, mB] = startB.split(":").map(Number);

    const startMinutesA = hA * 60 + mA;
    const endMinutesA = startMinutesA + durationA;

    const startMinutesB = hB * 60 + mB;
    const endMinutesB = startMinutesB + durationB;

    return startMinutesA < endMinutesB && startMinutesB < endMinutesA;
}
