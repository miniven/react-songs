export const songs = {
  fetch: [
    {
      author: "5cb7821037417a7617823162",
      created: "2019-04-17T19:44:16.836Z",
      genre: "3",
      lastChosen: "2019-04-12T19:44:19.000Z",
      title: "Song Title",
      _id: "5cb7821037417a7617823163"
    }
  ],
  create: {
    author: "5cb7913eaea22979b168f320",
    created: "2019-04-17T20:49:02.476Z",
    genre: "2",
    title: "Title",
    _id: "5cb7913eaea22979b168f321"
  },
  updateMultiple: {
    "5cb7913eaea22979b168f321": {lastChosen: "2019-07-26T18:23:11.227Z"},
    "5cb7821037417a7617823163": {lastChosen: "2019-07-26T18:23:11.227Z"}
  }
};

export const authors = {
  fetch: [
    {
      name: "Author Name",
      _id: "5c0a6615e6048b2cfc0be850"
    }
  ],
  create: [
    {
      name: "Author",
      _id: "5cb7913eaea22979b168f320"
    }
  ]
};

export const history = {
  fetch: [
    {
      date: "2019-04-12T19:44:19.000Z",
      list: ["5cb7821037417a7617823163"],
      _id: "5cb7822337417a7617823164"
    }
  ],
  create: {
    date: "2019-04-17T20:42:44.034Z",
    list: ["5cb7821037417a7617823163", "5cb7913eaea22979b168f321"],
    _id: "5cb79243aea22979b168f322"
  }
};