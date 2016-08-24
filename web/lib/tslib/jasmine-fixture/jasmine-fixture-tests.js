describe("Jasmine fixture extension", function () {
    describe("Affixes dom elements to body", function () {
        it("Inserts a new element on affix", function () {
            expect('#test1').not.toExist();
            affix('#test1');
            expect('#test1').toExist();
        });
        it("Inserts subelements when given", function () {
            affix('#test2 .something-special');
            expect('.something-special').toExist();
            var parent = $('#test2 .something-special').parent();
            var id = parent.attr('id');
            expect(id).toBe('test2');
        });
        it("Can add elements with multiple classes", function () {
            affix('#test3 div.this.that');
            expect('#test3 div').toHaveClass('this');
            expect('#test3 div').toHaveClass('that');
        });
        it("Creates new elements as divs by default", function () {
            affix('#test4 .subelement');
            expect('#test4 .subelement').toBeMatchedBy('div');
        });
        it("Can add different types of elements", function () {
            affix('#test5 p.part1');
            expect('#test5 .part1').toBeMatchedBy('p');
            affix('#test5 span.part2');
            expect('#test5 .part2').toBeMatchedBy('span');
        });
    });
    describe("Cleans up after each test", function () {
        it("Formerly affixed parts are removed when out of scope", function () {
            expect('#test1').not.toExist();
            expect('#test2').not.toExist();
            expect('#test3').not.toExist();
        });
    });
});
