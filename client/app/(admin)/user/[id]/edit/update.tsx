"use client";

import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "@/app/utils/common";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useLoading } from "@/app/context/loadingContext";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "@/app/graphql/mutations/createUser";
import { GET_USER } from "@/app/graphql/queries/getUser";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { UPDATE_USER } from "@/app/graphql/mutations/updateUser";

const UpdateUser = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const { enqueueSnackbar } = useSnackbar();
    const { setLoading } = useLoading();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [updateUser] = useMutation(UPDATE_USER);

    const onSubmit = async (data: any) => {
        console.log("data form=> ", data)
        setLoading(true);
        try {
            const userData = {
                username: data.username,
                phone: data.phone
            }
            await updateUser({
                variables: { id: parseFloat(id as string), dataUpdate: userData }
            })
            setLoading(false);
            enqueueSnackbar('Update user successfully!', { variant: 'success' });
            router.push('/')
        } catch (error) {
            enqueueSnackbar('Getting error!', { variant: 'error' });
            setLoading(false);
        }
    }

    const { loading } = useQuery(GET_USER, {
        variables: { id: parseFloat(id as string) },
        fetchPolicy: 'no-cache',
        onCompleted: (data) => {
            console.log("data=> ", data);
            setValue('username', data.user.username);
            setValue('phone', data.user.phone)
        },
        onError(error) {
            console.log("err=> ", error)
        }
    })

    useEffect(() => {
        if (loading) {
            setLoading(true);
        } else {
            setLoading(false)
        }
    }, [loading])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Update user
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoFocus
                        InputLabelProps={{
                            shrink: true
                        }}
                        {...register('username', {
                            required: "This field is required"
                        })}
                        error={!!errors.username}
                        helperText={getErrorMessage(errors.username)}
                    />
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        label="Phone"
                        InputLabelProps={{
                            shrink: true
                        }}
                        {...register('phone', {
                            required: "This field is required",
                            pattern: {
                                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                                message: "Please enter a vaild phone number"
                            }
                        })}
                        error={!!errors.phone}
                        helperText={getErrorMessage(errors.phone)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default UpdateUser;