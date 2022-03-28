const menu = (idMovie) => [
    {
      label: "Overview",
      link: "",
      children: [
        {
          label: "Cast & Crew",
          link: `/movie/${idMovie}/cast`,
        },
        {
          label: "Changes",
          link: `/movie/${idMovie}/changes`,
        },
      ],
    },
    {
      label: "Media",
      link: "",
      children: [
        {
          label: "Backdrops",
          link: `/movie/${idMovie}/backdrops`,
        },
        {
          label: "Logo",
          link: `/movie/${idMovie}/logo`,
        },
        {
          label: "Posters",
          link: `/movie/${idMovie}/posters`,
        },
        {
          label: "Trailers",
          link: `/movie/${idMovie}/trailers`,
        },
      ],
    },
]

export default menu;