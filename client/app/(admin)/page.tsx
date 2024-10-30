'use client';

import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_USER } from "../graphql/queries/fetchUser";
import { useEffect, useState } from "react";
import { useLoading } from "../context/loadingContext";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DELETE_USER } from "../graphql/mutations/deleteUser";
import { enqueueSnackbar } from "notistack";

const HomePage = () => {
    const { setLoading } = useLoading();
    const [open, setOpen] = useState(false);
    const { loading, data, refetch } = useQuery(FETCH_USER, {
        fetchPolicy: 'no-cache'
    })
    const [selectedItem, setSelectedItem] = useState<any>(null)
    const [deleteUser] = useMutation(DELETE_USER)

    const handleDeleteUser = async () => {
        setLoading(true);
        try {
            await deleteUser({
                variables: { id: selectedItem.id }
            })
            setLoading(false);
            enqueueSnackbar('Delete successfully!', { variant: 'success' })
            setOpen(false)
            refetch();
        } catch (error) {
            setLoading(false);
            enqueueSnackbar('Getting error!', { variant: 'error' })
            setOpen(false)
        }
    }

    useEffect(() => {
        if (loading) {
            setLoading(true)
        } else {
            setLoading(false);
        }
    }, [loading])

    return (
        <Container>
            <Link href='/user/add'>
                <Button variant="contained" sx={{ mt: 2, mb: 2 }} color="success" size='small' startIcon={<AddCircleOutlineIcon />}>
                    Create new user
                </Button>
            </Link>

            <TableContainer>
                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#2e7d32 !important' }}>
                        <TableRow>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Username</TableCell>
                            <TableCell sx={{ color: 'white' }}>Email</TableCell>
                            <TableCell sx={{ color: 'white' }}>Phone</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.users?.data.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" color="error" size="small" onClick={() => {
                                        setOpen(true);
                                        setSelectedItem(row)
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" color="success" size="small">
                                        <Link href={`user/${row.id}/edit`}>
                                            <EditIcon />
                                        </Link>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Delete Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        Are you sure want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteUser} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default HomePage;