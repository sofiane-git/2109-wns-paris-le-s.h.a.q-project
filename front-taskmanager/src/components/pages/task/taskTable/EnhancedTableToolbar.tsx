import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ButtonAdd from 'components/shared/ButtonAdd';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AlertDialogSlide from 'components/shared/AlertDialogSlide';
import { IEnhancedTableToolbarProps } from 'interfaces';
import DeleteTaskMutation from 'graphql/task/DeleteTaskMutation';

import AlertDialogCreateTask from 'components/pages/task/taskForm/AlertDialogCreateTask';

const EnhancedTableToolbar = (props: IEnhancedTableToolbarProps) => {
  const { numSelected, elementId, setSelected, refetch } = props;

  // SUPPRIMER UNE TACHE
  const [openDeleteTask, setOpenDeleteTask] = React.useState<boolean>(false);
  const [confirmationDeleteTask, setConfirmationDeleteTask] =
    React.useState(null);

  const [deleteTaskById, {}] = useMutation(DeleteTaskMutation);
  const deletedTask = (element: string[]) => {
    element.map(async (el) => {
      await deleteTaskById({ variables: { idToDelete: el } });
      refetch();
    });
  };

  const handleClickOpenDeleteTask = () => {
    setOpenDeleteTask(true);
  };

  const handleCloseDeleteTask = () => {
    setOpenDeleteTask(false);
  };

  useEffect(() => {
    if (confirmationDeleteTask) {
      deletedTask(elementId);
      setConfirmationDeleteTask(null);
    } else {
      setSelected([]);
      setConfirmationDeleteTask(null);
    }
    handleCloseDeleteTask();
  }, [confirmationDeleteTask]);

  // AJOUTER UNE TACHE
  const [openAddTask, setOpenAddTask] = React.useState<boolean>(false);

  const handleClickOpenAddTask = () => {
    setOpenAddTask(true);
  };

  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          py: 2,
          // ...(numSelected > 0 && {
          //   bgcolor: (theme) =>
          //     alpha(
          //       theme.palette.secondary.main,
          //       theme.palette.action.activatedOpacity
          //     ),
          // }),
          // justifyContent: 'space-around',
        }}
      >
        <div style={{ position: 'absolute' }}>
          {numSelected > 0 ? (
            <Tooltip title="Supprimer">
              {/* <IconButton onClick={handleClickOpenDeleteTask}>
              <DeleteIcon />
            </IconButton> */}
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={handleClickOpenDeleteTask}
              >
                SUPPRIMER
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Ajouter une tâche">
              <>
                <ButtonAdd
                  titleButton="Ajouter tâche"
                  onClick={handleClickOpenAddTask}
                />
              </>
            </Tooltip>
          )}
        </div>

        <Typography
          sx={{
            textTransform: 'uppercase',
            flex: 1,
          }}
          variant="h6"
          id="tableTitle"
          component="h1"
        >
          Liste des tâches
        </Typography>

        {numSelected > 0 ? (
          <Typography
            color="inherit"
            variant="subtitle1"
            component="div"
            sx={{
              textTransform: 'uppercase',
              justifySelf: 'right',
              color: 'red',
            }}
          >
            {numSelected} selected
          </Typography>
        ) : null}
      </Toolbar>
      <AlertDialogCreateTask
        refetch={refetch}
        openAddTask={openAddTask}
        handleCloseAddTask={handleCloseAddTask}
      />
      <AlertDialogSlide
        openDeleteTask={openDeleteTask}
        handleCloseDeleteTask={handleCloseDeleteTask}
        setConfirmationDeleteTask={setConfirmationDeleteTask}
      />
    </>
  );
};

export default EnhancedTableToolbar;
