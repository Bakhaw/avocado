import React, { Component, Fragment } from 'react'
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { withContext } from '../../Context/AppStateProvider';


class DeleteRecetteModal extends Component {

    state = {
        isDialogOpen: false
    }

    openDialog = () => {
        this.setState({ isDialogOpen: true });
    }

    closeDialog = () => {
        this.setState({ isDialogOpen: false });
    }

    deleteRecette = async () => {
        const { contextActions, item } = this.props;
        const { getSelectedUserRecipes } = contextActions;
        const recetteId = item._id;
        
        try {
            await axios.get(`/recipes/delete/${recetteId}`);
        } catch (err) {
            console.log(err)            
        }

        await getSelectedUserRecipes();
        this.closeDialog();
    }

    render() {
        const { isDialogOpen } = this.state;
        return (
            <Fragment>
                <MenuItem onClick={this.openDialog}>
                    Supprimer
                </MenuItem>
                <Dialog aria-labelledby='dialog-content'
                    maxWidth='xs'
                    fullWidth={true}
                    onClose={this.closeDialog}
                    open={isDialogOpen}>
                    <DialogContent id='dialog-content'>
                        <Typography variant='subheading'>Voulez-vous vraiment supprimer cette recette ?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button className='recette-dialog__close-button'
                            onClick={this.closeDialog}
                            variant='text'>
                            Non
                        </Button>
                        <Button className='recette-dialog__delete-button'
                            onClick={this.deleteRecette}
                            variant='text'>
                            Oui
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default withContext(DeleteRecetteModal);