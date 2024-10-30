'use client';

import { Avatar, Box, Container, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const Profile = () => {
    const { data: session } = useSession();
    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ p: 3, mt: 5 }}>
                <Avatar
                    src={"https://via.placeholder.com/150"}
                    sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                    {session?.user?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {session?.user?.email}
                </Typography>
            </Box>
        </Container>
    )
}

export default Profile;