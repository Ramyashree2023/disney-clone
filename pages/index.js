import {gql, GraphQLClient} from 'graphql-request'

import NavBar from "../Components/Navbar"

 import disneyLogo from '../public/disney logo.jpg'
 import marvelLogo from '../public/marvel logo.jpg'
 import natgeoLogo from '../public/national geographic.jpg'
 import starwarsLogo from '../public/starwarks.jpg'
 import pixarLogo from '../public/pixar.jpg'


export const getStaticprops = async () => {

  const url = process.env.ENDPOINT
  const graphQLclient = new GraphQLClient (url, {
    headers: {
      "Authorization" :process.env.GRAPH_CMS_TOKEN
    }
  })


const videosQuery = gql`
query{
  videos{
    createdAt,
    id,
    title,
    description,
    seen,
    slug,
    tags,
    thumbnail {
      url,
    }
    mp4{
      url
    }
  }
}
`

const accountQuery = gql`
query {
  account(where: { id:"clogsq6zs486h0apm1ltmg0nk"}){
    username   
    avatar {
      url
    }
  }
}
`
const data = await graphQLclient.request(videosQuery)
const videos = data.videos
const accountData = await graphQLclient.request(accountQuery)
const account = accountData.account
 
return {
  props: {
    videos,
    account
  }
 }
}


const  Home =({ videos, account }) => {
 const randomVideo = (videos) => {
     return videos[Math.floor(Math.random() * videos.length)]
   }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }
 
  const unSeenVideos = (videos) => {
    return videos.filter(video => video.Seen == false || video.seen == null)
  }


  return (
    <>
    <NavBar account={account}/>
    
       <div className="app">
          <div className="main-video">
          <img src={ randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).title}/>
         </div>

          <div className="video-feed">
          <Link href="#disney"><div className="franchise" id="disney">
            <Image src={disneyLogo}/>
              </div>
               </Link>
          <Link href="#pixar">
              <div className="franchise" id="pixar">
                <Image src={pixarLogo}/>
                </div>
                   </Link>
                   <Link href="#star-wars">
                       <div className="franchise" id="star-wars">
                           <Image src={starwarsLogo}/>
                       </div>
                   </Link>
                   <Link href="#nat-geo">
                       <div className="franchise" id="nat-geo">
                           <Image src={natgeoLogo}/>
                       </div>
                   </Link>
                   <Link href="#marvel">
                       <div className="franchise" id="marvel">
                           <Image src={marvelLogo}/>
                       </div>
                   </Link>
               </div>
               <Section genre={'Recommended for you'} videos={unSeenVideos(videos)}/>
               <Section genre={'Family'} videos={filterVideos(videos, 'family')}/>
               <Section genre={'Thriller'} videos={filterVideos(videos, 'thriller')}/>
               <Section genre={'Classic'} videos={filterVideos(videos, 'classic')}/>
               <Section id="pixar" genre={'Pixar'} videos={filterVideos(videos, 'pixar')}/>
               <Section id="marvel" genre={'Marvel'} videos={filterVideos(videos, 'thriller')}/>
               <Section id="nat-geo" genre={'National Geographic'}
                        videos={filterVideos(videos, 'national-geographic')}/>
               <Section id="disney" genre={'Disney'} videos={filterVideos(videos, 'disney')}/>
               <Section id="star-wars" genre={'Star Wars'} videos={filterVideos(videos, 'star-wars')}/>


           </div>
       </>
   )
}

export default Home

