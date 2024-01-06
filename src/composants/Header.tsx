import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import jwtDecode, { JwtPayload } from 'jwt-decode';

interface MyToken extends JwtPayload {
    role?: string;
  }
var token = localStorage.getItem("token");


interface HeaderProps {
    onToggleInterface: () => void; 
    isToggleActive:  boolean; 
  }
  function Header({ onToggleInterface, isToggleActive }: HeaderProps) {
    useEffect(() => {
        setIsAuthorized(checkUserRole());
    });
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    let pages;
    if (isToggleActive) {
        pages = ['Déconnexion'];
    } else if (token == null || token === "disconnected") {
        pages = ['Connexion', 'Inscription'];
    } else{
        pages = ['Ajout', 'Liste', 'Déconnexion']; 
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    return (
        <AppBar sx={{
           backgroundColor : "#ff5900" 
        }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        All4Parts
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={page}>{page}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        All4Parts
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link className={"header-link"} to={page}>{page}</Link>
                        ))}
                    </Box>
                    {isAuthorized && (
                        <button onClick={onToggleInterface} style={{ marginLeft: 'auto' }}>
                            {isToggleActive ? <span>Contracts</span> : <span>Dashboard</span>}
                        </button>
                    )}

                </Toolbar>
             
            </Container>
        </AppBar>
    );
}
export default Header;

function checkUserRole() : boolean{
    var token = localStorage.getItem("token");
     if(token !== null){
      const decodedToken = jwtDecode<MyToken>(token);
      if(decodedToken.role === "commercial"){ //might need to be changed to admin 
          return true;
        }
      };
      return false;
  
  }
  