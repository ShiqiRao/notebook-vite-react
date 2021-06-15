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

        <Switch>
            <div className="home__con">
                <Route path="/note">
                    <Note></Note>
                </Route>
                <Route path="/photo">
                    <Photo></Photo>
                </Route>
            </div>
        </Switch>

    </div>
}

export default Home