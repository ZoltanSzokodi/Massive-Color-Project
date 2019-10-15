import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColor';
import NewPaletteform from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { withStyles } from '@material-ui/styles';

const styles = {
  page: {
    height: "100vh",
    width: "100%",
    position: "fixed"
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))

    this.state = {
      palettes: savedPalettes || seedColors
    };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(palette => (
      palette.id === id
    ))
  }

  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] }, this.synchLocalStorage);
  }

  synchLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }

  deletePalette(id) {
    this.setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== id)
    }),
      this.synchLocalStorage
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            classNames="item"
            timeout={500}
            key={location.key} >
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <div className={classes.page}>
                    <NewPaletteform
                      savePalette={this.savePalette}
                      palettes={this.state.palettes}
                      {...routeProps}
                    />
                  </div>
                )}
              />

              <Route
                exact
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                  <div className={classes.page}>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                    />
                  </div>
                )}
              />

              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <div className={classes.page}>
                    <PaletteList
                      palettes={this.state.palettes}
                      deletePalette={this.deletePalette}
                      {...routeProps}
                    />
                  </div>
                )}
              />

              <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                  <div className={classes.page}>
                    <Palette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                    />
                  </div>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    )
  }
}

export default withStyles(styles)(App);
