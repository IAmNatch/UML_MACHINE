export const example = {
  id: "root",
  children: [
    {
      fk: "justabox",
      type: "box",
      title: "cool",
      content: `hello world i am your ru`,
    },
    {
      fk: "first",
      type: "uml",
      title: "Bae",
      content: [
        [
          `String [string] dsfkljdfsklj`,
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
    {
      fk: "second",
      type: "uml",
      title: "Hello lk",
      content: [
        [
          "String [string]",
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
    {
      fk: "third",
      type: "uml",
      title: "Hello lk",
      content: [
        [
          "String [string]",
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
    {
      fk: "something_elssee",
      type: "uml",
      title: "Hello dear sir",
      content: [
        [
          "String [string]",
          "Number! [number]",
          "long long long [long] dddddddd",
          "Number! [number]",
          "long long long [long] dddddddd",
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
  ],
  connections: [
    { id: "e1", label: "hell world", sources: ["first"], targets: ["second"] },
    { id: "e2", label: "hell world", sources: ["first"], targets: ["third"] },
  ],
};
