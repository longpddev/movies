import React, {useState} from 'react'
import { useGetSearchQuery } from '../../services/movieApi'; 
const useMultiSearch = (search) => {
  const [ moviesPage, setMoviesPage ] = useState(1);
  const { data: moviesData } = useGetSearchQuery({
      type: 'movie',
      keyword: search,
      page: moviesPage
  }, { 
      skip: (search?.length || 0) < 2
  });

  const [ companyPage, setCompanyPage ] = useState(1);
  const { data: companyData } = useGetSearchQuery({
      type: 'company',
      keyword: search,
      page: companyPage
  }, { 
      skip: (search?.length || 0) < 2
  });

  const [ keywordPage, setKeywordPage ] = useState(1);
  const { data: keywordData } = useGetSearchQuery({
      type: 'keyword',
      keyword: search,
      page: keywordPage
  }, { 
      skip: (search?.length || 0) < 2
  });

  const [ personPage, setPersonPage ] = useState(1);
  const { data: personData } = useGetSearchQuery({
      type: 'person',
      keyword: search,
      page: personPage
  }, { 
      skip: (search?.length || 0) < 2
  });

  const [ tvPage, setTvPage ] = useState(1);
  const { data: tvData } = useGetSearchQuery({
      type: 'tv',
      keyword: search,
      page: tvPage
  }, { 
      skip: (search?.length || 0) < 2
  });

  return {
    movies: {
      page: moviesPage,
      setPage: setMoviesPage,
      data: moviesData
    },
    company: {
      page: companyPage,
      setPage: setCompanyPage,
      data: companyData
    },
    keyword: {
      page: keywordPage,
      setPage: setKeywordPage,
      data: keywordData
    },
    person: {
      page: personPage,
      setPage: setPersonPage,
      data: personData
    },
    tv: {
      page: tvPage,
      setPage: setTvPage,
      data: tvData
    }
  }

}

export default useMultiSearch