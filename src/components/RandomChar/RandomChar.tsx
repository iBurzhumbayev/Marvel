import {useEffect, useState} from "react";
import {getResource, appKey, transformCharacter} from "../../common/service";
import { Character } from '../../common/models';
import mjolnir from '../../resources/img/mjolnir.png';
import './RandomChar.scss';

const RandomChar = () => {
    //@ts-ignore
    const [char, setChar] = useState<Character>({});

    const getCharacter = async (id:number) => {
        const res = await getResource(`characters/${id}?${appKey}`);
        const character = transformCharacter(res.data.results[0]);
        setChar(character);
    }

    useEffect(() => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacter(id)
    }, [])

    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacter(id)
    }

    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img" />
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
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

export default RandomChar;