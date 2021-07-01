import React from "react"
import {
    Route, Switch
} from "react-router-dom"
import LeftNav from "../../components/LeftNav/LeftNav"
import Note from "../Note/Note"
import Photo from "../Photo/Photo"
import './Home.scss'

function Home() {
    return <div>
        <LeftNav></LeftNav>
        <div className="home__con" style={{ height: window.innerHeight }}>
            <Switch>

                <Route path="/note">
                    <Note></Note>
                </Route>
                <Route path="/photo">
                    <Photo></Photo>
                </Route>
            </Switch>
        </div>
    </div>
}

export default Home