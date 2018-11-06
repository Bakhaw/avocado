import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import CreateRecetteForm from './CreateRecetteForm';

class CreateRecette extends Component {

    state = {
        isDialogOpen: false
    }

    openDialog = () => {
        this.setState({ isDialogOpen: true });
    }

    closeDialog = () => {
        this.setState({ isDialogOpen: false });
    }

    render() {
        const { isDialogOpen } = this.state;

        return (
            <Fragment>
                <Button className='create-recette__open-button'
                    onClick={this.openDialog}
                    variant='contained'>
                    Ajouter une recette
                </Button>
                <Dialog aria-labelledby='simple-dialog-title'
                    maxWidth='lg'
                    fullWidth={true}
                    onClose={this.closeDialog}
                    open={isDialogOpen}>
                    {/* open={isDialogOpen}> */}
                    <DialogTitle id='simple-dialog-title'>Ajouter une recette</DialogTitle>
                    <DialogContent>
                        <CreateRecetteForm closeDialog={this.closeDialog} />
                    </DialogContent>
                    <DialogActions>
                        <Button className='create-recette__close-button'
                            onClick={this.closeDialog}
                            variant='text'>
                            Fermer
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default CreateRecette;