import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

import CreateRecetteForm from '../CreateRecetteModal/CreateRecetteForm';

class UpdateRecetteModal extends Component {

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
                <MenuItem onClick={this.openDialog}>
                    Modifier
                </MenuItem>
                <Dialog aria-labelledby='dialog-title'
                    maxWidth='lg'
                    fullWidth={true}
                    onClose={this.closeDialog}
                    open={isDialogOpen}>
                    <DialogTitle id='dialog-title'>Ajouter une recette</DialogTitle>
                    <DialogContent>
                        <CreateRecetteForm />
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

export default UpdateRecetteModal;