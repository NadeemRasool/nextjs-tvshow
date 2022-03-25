import { useRouter } from "next/router";
import {useEffect,useState} from "react";
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
    let [name,setName] = useState("");
    useEffect(()=>{
        (async ()=>{            
            let getName=await fetch(`https://api.tvmaze.com/shows/${show.id}`);
            getName=await getName.json();
            
            if(getName?.name.length>0)
            {
                setName(getName.name);
                console.log("Data from API: ",getName.name);
            }    
            
        })();
    },[show.id]);
    return (
        <div className={styles.fx_c} style={{padding:10,justifyContent: 'center'}}>
            <Link style={{padding:10}} href={`/`}>Back</Link>
            <div className={styles.fx_r} style={{margin:10,justifyContent:'center',width:'80%'}}>      
                <div>
                    <img src={show.image.original} className={styles.showImg} alt="Loading Image"/>
                </div>
                <div className={styles.fx_c} style={{width:'70%',paddingLeft:10,alignItems:'flex-start'}}>
                    <div style={{padding:10}}>{name}</div>
                    <div style={{padding:10}} className={styles.fx_r}>
                        {show.genres.map(genre=>(<div style={{paddingRight:10}} key={genre}>{genre}</div>))}
                    </div>
                    <div style={{padding:10}}>{show.summary}</div>

                </div>      
            </div>
        </div>
    );
}