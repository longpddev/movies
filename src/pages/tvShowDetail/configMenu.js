const menu = (idTvShow) => [
    {
      label: "Overview",
      link: "",
      children: [
        {
          label: "Cast & Crew",
          link: `/tv/${idTvShow}/cast`,
        },
      ],
    },
    {
      label: "Media",
      link: "",
      children: [
        {
          label: "Backdrops",
          link: `/tv/${idTvShow}/backdrops`,
        },
        {
          label: "Posters",
          link: `/tv/${idTvShow}/posters`,
        },
        {
          label: "Video",
          link: `/tv/${idTvShow}/video`,
        },
      ],
    },
]

export default menu;