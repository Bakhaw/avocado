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

    handleFormSubmit = async (e, state) => {
        // TODO, make this working with <RecetteForm /> Component
        console.log('fired my man')
        e.preventDefault();

        const params = new FormData();
        const { closeDialog, contextActions, contextState } = this.props;
        const { _id, displayName, email, image } = contextState.userLogged;

        // ? AuthorInfos
        params.append('authorInfos.displayName', displayName);
        params.append('authorInfos.email', email);
        params.append('authorInfos.id', _id);
        params.append('authorInfos.authorImage', image);

        const { description, ingredients, instructions, recetteImage, time, title } = state;
        // ? RecetteInfos
        params.append('recetteInfos.description', description);
        params.append('recetteInfos.ingredients', ingredients);
        params.append('recetteInfos.instructions', instructions);
        params.append('recetteInfos.recetteImage', recetteImage);
        params.append('recetteInfos.time', time);
        params.append('recetteInfos.title', title);

        const { getSelectedUserRecipes } = contextActions;
        try {
            await axios({
                method: 'post',
                url: '/recipes/update',
                data: params
            });

            await getSelectedUserRecipes();
            closeDialog();
        } catch (err) {
            console.log(err)
        }
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
                        <CreateRecetteForm handleFormSubmit={this.handleFormSubmit} />
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