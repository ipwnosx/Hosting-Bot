module.exports.UnitTest = class UnitTest {
    
    constructor(finishedCallback) {
        if(finishedCallback instanceof Function){
            this.callback = finishedCallback;        
        }else this.callback = () => {};
    }
    assertEquals(a, b, strict=false){
        const r =  strict ? a === b : a == b;
        this.callback(r, "assertEquals")
    }
    assertFalse(a){
        const r = this.assertEquals(a, false, true)
        this.callback(r, "assertFalse")
        return r;
    }
    assertTrue(a){
        const r = this.assertEquals(a, true, true);
        this.callback(r, "assertTrue");
        return r;
    }
    assertBiggerThan(a,b){
        const r = a > b;
        this.callback(r, "assertBiggerThan");
        return r;
    }
    assertSmallerThan(a,b){
        const r = a < b;
        this.callback(r, "assertSmallerThan");
        return r;
    }
    assertDefined(a){
        const r = a !== undefined || a !== null || a !== NaN;
        this.callback(r, "assertDefined");
        return r;
    }
}
    