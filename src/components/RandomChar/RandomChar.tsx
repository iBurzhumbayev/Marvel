import {useEffect, useState} from "react";
import {getResource, appKey, transformCharacter} from "../../common/service";
import { Character } from '../../common/models';
import Spinner from "../Spinner/Spinner";
import mjolnir from '../../resources/img/mjolnir.png';
import './RandomChar.scss';

const RandomChar = () => {
    //@ts-ignore
    const [char, setChar] = useState<Character>({});
    const [isLoading, setIsLoading] = useState(true)

    const getCharacter = async (id:number) => {
        const res = await getResource(`/characters/${id}?${appKey}`);
        const character = transformCharacter(res.data.results[0]);
        setChar(character);
        setIsLoading(false)
    }
    console.log(char)

    useEffect(() => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacter(id)
    }, [])

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        setIsLoading(true)
        getCharacter(id)
    }



    return (
        <div className="randomchar">
            <div className="randomchar__block">
                {isLoading ? <Spinner/> : <View char={char}/>}
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

interface ViewProps {
    char: Character;
}

const View = ({char}: ViewProps) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
    
    return (
        <>
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a target="_blank" href={homepage} className="button button__main" rel="noreferrer">
                        <div className="inner">homepage</div>
                    </a>
                    <a target="_blank" href={wiki} className="button button__secondary" rel="noreferrer">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;