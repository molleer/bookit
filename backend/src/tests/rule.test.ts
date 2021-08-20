import { Rule } from "../models";
import assert from "assert";
import {
  toMiniRules,
  MiniRule,
  day,
  dayApplies,
  mergeRules,
} from "../services/rule.service";

const defaultRule: Rule = {
  id: "",
  day_mask: 0b1111111,
  start_date: "",
  end_date: "",
  start_time: "",
  end_time: "",
  description: "",
  allow: false,
  priority: 10,
  title: "",
  created_at: "",
  update_at: "",
  room: [],
};

const defaultMiniRule: MiniRule = {
  ...defaultRule,
  start: new Date(),
  end: new Date(),
};

const dummyRules: Rule[] = [
  {
    ...defaultRule,
    start_date: "2001-01-01",
    end_date: "2030-12-31",
    start_time: "08:00",
    end_time: "17:00",
    day_mask: 0b0011101,
  },
  {
    ...defaultRule,
    start_date: "2001-01-01",
    end_date: "2030-12-31",
    start_time: "07:00",
    end_time: "10:00",
    priority: 9,
    allow: true,
    day_mask: 0b0000010,
  },
];

describe("Rule utility functions", () => {
  it("Should create ISO date", () => {
    const date = new Date("2021-08-19");
    const time = "17:00";
    assert.equal(
      new Date("2021-08-19T17:00").toISOString(),
      new Date(day(date) + "T" + time).toISOString(),
    );
  });
  it("Should allow day", () => {
    assert.equal(
      dayApplies(new Date("2021-08-19"), 0b0001000),
      true,
      "0b0001000",
    );
    assert.equal(
      dayApplies(new Date("2021-08-19"), 0b0001100),
      true,
      "0b0001100",
    );
    assert.equal(
      dayApplies(new Date("2021-08-19"), 0b0011000),
      true,
      "0b0011000",
    );
  });
  it("Should not allow day", () => {
    assert.equal(
      dayApplies(new Date("2021-08-19"), 0b1110111),
      false,
      "0b1110111",
    );
    assert.equal(
      dayApplies(new Date("2021-08-19"), 0b0000000),
      false,
      "0b0000000",
    );
    assert.equal(
      dayApplies(new Date("2021-08-19"), 0b0000111),
      false,
      "0b0000111",
    );
  });
});

const assertMiniRuleEqual = (exp: MiniRule, got: MiniRule) => {
  assert.equal(got.start.toISOString(), exp.start.toISOString());
  assert.equal(got.description, exp.description);
  assert.equal(got.allow, exp.allow);
};

describe("Rules to MiniRules", () => {
  it("Should create one mini rule", () => {
    const expected: MiniRule[] = [
      {
        ...defaultMiniRule,
        start: new Date("2021-08-20T08:00"),
        end: new Date("2021-08-20T17:00"),
      },
    ];
    const got: MiniRule[] = toMiniRules(
      [dummyRules[0]],
      new Date("2021-08-20"),
      new Date("2021-08-20"),
    );
    assert.equal(got.length, expected.length);
    assertMiniRuleEqual(got[0], expected[0]);
  });
  it("Should create two mini rules", () => {
    const expected: MiniRule[] = [
      {
        ...defaultMiniRule,
        start: new Date("2021-08-19T08:00"),
        end: new Date("2021-08-20T17:00"),
      },
      {
        ...defaultMiniRule,
        start: new Date("2021-08-20T08:00"),
        end: new Date("2021-08-20T17:00"),
      },
    ];
    const got: MiniRule[] = toMiniRules(
      [dummyRules[0]],
      new Date("2021-08-19"),
      new Date("2021-08-20"),
    );
    assert.equal(got.length, expected.length);
    assertMiniRuleEqual(got[0], expected[0]);
    assertMiniRuleEqual(got[1], expected[1]);
  });
  it("Should create two mini rules, one masked out", () => {
    const expected: MiniRule[] = [
      {
        ...dummyRules[1],
        start: new Date("2021-08-17T07:00"),
        end: new Date("2021-08-17T10:00"),
      },
      {
        ...dummyRules[0],
        start: new Date("2021-08-18T08:00"),
        end: new Date("2021-08-18T17:00"),
      },
    ];
    const got: MiniRule[] = toMiniRules(
      [dummyRules[0], dummyRules[1]],
      new Date("2021-08-17"),
      new Date("2021-08-18"),
    );
    assert.equal(got.length, expected.length);
    assertMiniRuleEqual(got[0], expected[0]);
    assertMiniRuleEqual(got[1], expected[1]);
  });
});

describe("Merge rules", () => {
  it("No rules", () => {
    const expected: MiniRule[] = [];
    const got = mergeRules(
      toMiniRules([], new Date("2021-08-18"), new Date("2021-08-20")),
    );
    assert.deepEqual(got, expected);
  });
  it("One rule", () => {
    const expected: MiniRule[] = [
      {
        ...defaultMiniRule,
        start: new Date("2021-08-20T08:00"),
        end: new Date("2021-08-20T17:00"),
      },
    ];
    const got = mergeRules(
      toMiniRules(
        [dummyRules[0]],
        new Date("2021-08-20"),
        new Date("2021-08-21"),
      ),
    );

    assert.equal(expected.length, got.length);
    assertMiniRuleEqual(expected[0], got[0]);
  });
  /**
   *  ---------
   * +++
   * equals
   * +++-------
   */
  it("Two overlapping rules v1", () => {
    const rules = [
      {
        ...defaultRule,
        start_date: "2001-01-01",
        end_date: "2030-12-31",
        start_time: "08:00",
        end_time: "17:00",
      },
      {
        ...defaultRule,
        start_date: "2001-01-01",
        end_date: "2030-12-31",
        start_time: "07:00",
        end_time: "10:00",
        priority: 9,
        allow: true,
      },
    ];
    const expected: MiniRule[] = [
      {
        ...rules[1],
        start: new Date("2021-08-20T07:00"),
        end: new Date("2021-08-20T10:00"),
      },
      {
        ...rules[0],
        start: new Date("2021-08-20T10:00"),
        end: new Date("2021-08-20T17:00"),
      },
    ];
    const got = mergeRules(
      toMiniRules(rules, new Date("2021-08-20"), new Date("2021-08-20")),
    );
    assert.equal(got.length, expected.length);
    assertMiniRuleEqual(expected[0], got[0]);
    assertMiniRuleEqual(expected[1], got[1]);
  });
  /**
   *  ---------
   *    +++
   * equals
   *  --+++----
   */
  it("Two overlapping rules v2", () => {
    const rules = [
      {
        ...defaultRule,
        start_date: "2001-01-01",
        end_date: "2030-12-31",
        start_time: "08:00",
        end_time: "17:00",
      },
      {
        ...defaultRule,
        start_date: "2001-01-01",
        end_date: "2030-12-31",
        start_time: "10:00",
        end_time: "13:00",
        priority: 9,
        allow: true,
      },
    ];
    const expected: MiniRule[] = [
      {
        ...rules[0],
        start: new Date("2021-08-20T08:00"),
        end: new Date("2021-08-20T10:00"),
      },
      {
        ...rules[1],
        start: new Date("2021-08-20T10:00"),
        end: new Date("2021-08-20T13:00"),
      },
      {
        ...rules[0],
        start: new Date("2021-08-20T13:00"),
        end: new Date("2021-08-20T17:00"),
      },
    ];
    const got = mergeRules(
      toMiniRules(rules, new Date("2021-08-20"), new Date("2021-08-20")),
    );
    assert.equal(got.length, expected.length);
    assertMiniRuleEqual(expected[0], got[0]);
    assertMiniRuleEqual(expected[1], got[1]);
    assertMiniRuleEqual(expected[2], got[2]);
  });
  /**
   *         ++++
   *  ---------
   *    +++
   * equals
   *  --+++----++
   */
  it("Three overlapping rules", () => {
    const rules = [
      {
        ...defaultRule,
        start_date: "2001-01-01",
        end_date: "2030-12-31",
        start_time: "08:00",
        end_time: "17:00",
        priority: 9,
      },
      {
        ...defaultRule,
        start_date: "2001-01-01",
        end_date: "2030-12-31",
        start_time: "10:00",
        end_time: "13:00",
        priority: 8,
        allow: true,
      },
      {
        ...defaultRule,
        start_date: "2001-01-01",
        end_date: "2030-12-31",
        start_time: "15:00",
        end_time: "19:00",
        allow: true,
      },
    ];
    const expected: MiniRule[] = [
      {
        ...rules[0],
        start: new Date("2021-08-20T08:00"),
        end: new Date("2021-08-20T10:00"),
      },
      {
        ...rules[1],
        start: new Date("2021-08-20T10:00"),
        end: new Date("2021-08-20T13:00"),
      },
      {
        ...rules[0],
        start: new Date("2021-08-20T13:00"),
        end: new Date("2021-08-20T17:00"),
      },
      {
        ...rules[2],
        start: new Date("2021-08-20T17:00"),
        end: new Date("2021-08-20T19:00"),
      },
    ];
    const got = mergeRules(
      toMiniRules(rules, new Date("2021-08-20"), new Date("2021-08-20")),
    );
    assert.equal(got.length, expected.length);
    assertMiniRuleEqual(expected[0], got[0]);
    assertMiniRuleEqual(expected[1], got[1]);
    assertMiniRuleEqual(expected[2], got[2]);
    assertMiniRuleEqual(expected[3], got[3]);
  });
});
