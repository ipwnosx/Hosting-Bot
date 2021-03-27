const CUnit = require("./Assertions").UnitTest;

const UnitTest = new CUnit((status, testName) => { 

    const failed = ['✖', '❌', '❎', '❗', '😡', '😤', '😨', '😪']
    const succeeded = ['🔥', '😁', '✓', '😏', '✅', '❤']

    const index = Math.floor(Math.random() * (status ? succeeded.length : failed.length));

    console.log(`${status ? succeeded[index] : failed[index]}   -   ${status ? 'Passed' : 'Failed'} test '${testName}'`)

})

for(let x = 0; x < 50; ++x){
    let rNum = Math.random() * 9000;
    let srNum = Math.random() * 9000;
    UnitTest.assertBiggerThan(rNum, srNum);
}
