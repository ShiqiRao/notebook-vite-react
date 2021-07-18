import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Switch } from "react-router-dom"
import LeftNav from "../../components/LeftNav/LeftNav"
import { fetchFolder } from "../../reducer/folder"
import Folder from "../Folder/Folder"
import Note from "../Note/Note"
import Photo from "../Photo/Photo"
import './Home.scss'

function Home() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchFolder())
    }, [])
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
                <Route path="/folder">
                    <Folder></Folder>
                </Route>
            </Switch>
        </div>
    </div>
}

export default Home