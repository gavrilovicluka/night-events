import React from "react";
import { Nav } from "react-bootstrap";
import { HashRouter, Link } from "react-router-dom";

export class MainMenuItem {
    text: string = "";
    link: string = "#";

    constructor(text: string, link: string) {
        this.text = text;
        this.link = link;
    }
}

interface MainMenuProperties {
    items: MainMenuItem[];
}

interface MainMenuState {
    items: MainMenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {

    state: MainMenuState;
    constructor(props: MainMenuProperties) {
        super(props);

        //struktura koja ce cuvati odredjene elemente sa kojima smatramo da stanje moze da se menja
        this.state = {
            items: props.items,          
        };    
    }

    setItems(items: MainMenuItem[]) {
        this.setState({
            items: items,  //umesto pocetnog stanja dobice novi items koji je prosledjen
        })
    }

    render() {
        return (
            <Nav variant="tabs">
                <HashRouter>
                    { 
                        this.state.items.map((item) => {
                            return(
                                <Link to={ item.link } className="nav-link">
                                    { item.text }
                                </Link>
                                
                            )
                        }) 
                    }
                </HashRouter>
            </Nav>
        );
    }

}