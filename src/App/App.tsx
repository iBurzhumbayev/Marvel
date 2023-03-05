import { useState } from 'react'
import { AppHeader, RandomChar, CharList, CharInfo } from "../components";

import decoration from '../resources/img/vision.png';

const App = () => {
    const [selectedChar, setSelectedChar] = useState()

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }
    console.log(selectedChar)
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected}/>
                    <CharInfo charId={selectedChar}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;