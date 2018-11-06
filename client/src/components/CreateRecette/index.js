import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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
                <Button className='create-recette__button'
                    onClick={this.openDialog}
                    variant='contained'>
                    Ajouter une recette
                </Button>
                <Dialog aria-labelledby='simple-dialog-title'
                    maxWidth='lg'
                    fullWidth={true}
                    onClose={this.closeDialog}
                    open={isDialogOpen}>
                    <DialogTitle id='simple-dialog-title'>Ajouter une recette</DialogTitle>
                    <DialogContent>
                        <CreateRecetteForm />
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

export default CreateRecette;