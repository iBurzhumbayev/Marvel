import {useEffect, useState} from "react";
import {getResource, appKey, transformCharacter} from "../../common/service";
import { Character } from '../../common/models';
import './CharList.scss';

const CharList = ({onCharSelected}) => {
    // @ts-ignore
    const [charList, setCharList] = useState<Character[]>([]);

    const getAllCharacters = async () => {
        const res = await getResource(`/characters?limit=9&${appKey}`);
        const character = res.data.results.map(transformCharacter);
        setCharList(character);
    }

    useEffect(() => {
        getAllCharacters()
    }, [])

    console.log(charList)
    

    return (
        <div className="char__list">
            <ul className="char__grid">
                {charList.map(char => {
                    let imgStyle = {'objectFit' : 'cover'};
                    if (char.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                        imgStyle = {'objectFit' : 'unset'};
                    }
                    return (
                        <li key={char.id} className="char__item" onClick={() => onCharSelected(char.id)}>
                            <img src={char.thumbnail} alt="char" style={imgStyle}/>
                            <div className="char__name">{char.name}</div>
                        </li>
                    )
                })}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;