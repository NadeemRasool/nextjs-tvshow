import Head from 'next/head'
import { Fragment } from 'react'
import Link, {link} from 'next/link'
import styles from '../styles/Home.module.css'



export async function getStaticProps(context){
  let showList = await fetch("https://api.tvmaze.com/search/shows?q=a");
  showList = await showList.json();
  return (
    {
      props:{
        shows:showList
      }
    }
  );
}

export default function Home({shows}) {
  const openDetail=(showid)=>{
    console.log("i am clicked",showid);
  }
  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.fx_r}>
          {
            shows.map(show=> {
                 return (<ShowWidget {...show} openDetail={openDetail} key={show.show.id}/>)
            })
          }
        </div>
      </div>
    </Fragment>
  )
}

function ShowWidget({show,score,openDetail}){
  return (
    <Link href={`/tvshows/${show.id}`} passHref={true}>
    <div className={styles.fx_c} style={{margin:10}}>      
        <div>
          <img src={show.image.original} className={styles.showImg} alt="no image"/>
        </div>
        <div>
          {show.name}
        </div>      
    </div>
    </Link>
  );
} 



