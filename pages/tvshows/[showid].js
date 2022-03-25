import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
export async function getStaticProps(context){
    let showId=context.params.showid;
    let show = await fetch(`https://api.tvmaze.com/shows/${showId}`);
    show=await show.json();
    return ({
        props:{
            show
        }
    });
}

export async function getStaticPaths(context){
    let showList = await fetch("https://api.tvmaze.com/search/shows?q=a");
    showList=await showList.json();
    let showId=showList.map(path=>({params:{showid:path.show.id.toString()}}));
    return ({
        paths:showId,
        fallback:false
    });
}

export default function ShowDetail({show}){

    return (
        <div className={styles.fx_c}>
            <Link style={{padding:10}} href={`/`}>Back</Link>
            <div className={styles.fx_r} style={{margin:10,justifyContent:'flex-start'}}>      
                <div>
                    <img src={show.image.original} className={styles.showImg}/>
                </div>
                <div className={styles.fx_c} style={{width:'70%',paddingLeft:10,alignItems:'flex-start'}}>
                    <div style={{padding:10}}>{show.name}</div>
                    <div style={{padding:10}} className={styles.fx_r}>
                        {show.genres.map(genre=>(<div style={{paddingRight:10}} key={genre}>{genre}</div>))}
                    </div>
                    <div style={{padding:10}}>{show.summary}</div>

                </div>      
            </div>
        </div>
    );
}