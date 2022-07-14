const menu = (currentPath) => [
    {
      label: "Overview",
      link: "",
      children: [
        {
          label: "Main",
          link: `${currentPath}`,
        }
      ],
    },
    {
      label: "Favorites",
      link: "",
      children: [
        {
          label: "Movies",
          link: `${currentPath}/favorite/movies`,
        },
        {
          label: "TV show",
          link: `${currentPath}/favorite/tv`,
        },
      ],
    },
    {
      label: "Ratings",
      link: "",
      children: [
        {
          label: "Movies",
          link: `${currentPath}/ratings/movies`,
        },
        {
          label: "TV show",
          link: `${currentPath}/ratings/tv`,
        },
      ],
    },
    {
      label: "Watchlist",
      link: "",
      children: [
        {
          label: "Movies",
          link: `${currentPath}/watchlist/movies`,
        },
        {
          label: "TV show",
          link: `${currentPath}/watchlist/tv`,
        },
      ],
    },
]

export default menu;