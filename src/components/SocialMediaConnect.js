import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Check as CheckIcon,
  Link as LinkIcon
} from '@mui/icons-material';

// Mock connected accounts
const initialConnectedAccounts = [
  { id: 1, type: 'facebook', username: 'john.doe', connected: true, verified: true },
  { id: 2, type: 'instagram', username: 'johndoe_official', connected: true, verified: true },
  { id: 3, type: 'linkedin', username: '', connected: false, verified: false },
  { id: 4, type: 'twitter', username: '', connected: false, verified: false }
];

function SocialMediaConnect() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [connectedAccounts, setConnectedAccounts] = useState(initialConnectedAccounts);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [username, setUsername] = useState('');

  const handleOpenDialog = (account) => {
    setCurrentAccount(account);
    setUsername(account.username);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentAccount(null);
    setUsername('');
  };

  const handleToggleConnection = (accountId) => {
    setConnectedAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id === accountId
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };

  const handleConnect = () => {
    if (currentAccount) {
      setConnectedAccounts(prevAccounts =>
        prevAccounts.map(account =>
          account.id === currentAccount.id
            ? { ...account, username, connected: true, verified: true }
            : account
        )
      );
    }
    handleCloseDialog();
  };

  const getAccountIcon = (type) => {
    switch (type) {
      case 'facebook':
        return <FacebookIcon color="primary" />;
      case 'instagram':
        return <InstagramIcon sx={{ color: '#E1306C' }} />;
      case 'linkedin':
        return <LinkedInIcon sx={{ color: '#0077B5' }} />;
      case 'twitter':
        return <TwitterIcon sx={{ color: '#1DA1F2' }} />;
      default:
        return <LinkIcon />;
    }
  };

  const getAccountName = (type) => {
    switch (type) {
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'linkedin':
        return 'LinkedIn';
      case 'twitter':
        return 'Twitter';
      default:
        return type;
    }
  };

  return (
    <Card elevation={1} sx={{ borderRadius: 2, mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Connected Accounts
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Connect your social media accounts to verify your profile and make it easier to find friends.
        </Typography>
        
        <List>
          {connectedAccounts.map((account) => (
            <React.Fragment key={account.id}>
              <ListItem>
                <ListItemIcon>
                  {getAccountIcon(account.type)}
                </ListItemIcon>
                <ListItemText
                  primary={getAccountName(account.type)}
                  secondary={
                    account.connected ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" component="span">
                          {account.username}
                        </Typography>
                        {account.verified && (
                          <Box 
                            component="span" 
                            sx={{ 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              ml: 1,
                              color: 'success.main',
                              fontSize: '0.75rem'
                            }}
                          >
                            <CheckIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                            Verified
                          </Box>
                        )}
                      </Box>
                    ) : (
                      'Not connected'
                    )
                  }
                />
                <ListItemSecondaryAction>
                  {account.connected ? (
                    <Switch
                      edge="end"
                      checked={account.connected}
                      onChange={() => handleToggleConnection(account.id)}
                      color="primary"
                    />
                  ) : (
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleOpenDialog(account)}
                    >
                      Connect
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button 
          variant="contained" 
          color="primary"
          size={isMobile ? "small" : "medium"}
        >
          Save Changes
        </Button>
      </CardActions>

      {/* Connect Account Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Connect {currentAccount ? getAccountName(currentAccount.type) : ''} Account
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="body2" paragraph>
              Enter your {currentAccount ? getAccountName(currentAccount.type) : ''} username to connect your account.
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {currentAccount && getAccountIcon(currentAccount.type)}
              <Typography variant="body1" sx={{ ml: 1 }}>
                {currentAccount ? getAccountName(currentAccount.type) : ''}
              </Typography>
            </Box>
            
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outlined"
              placeholder={`Enter your ${currentAccount ? getAccountName(currentAccount.type) : ''} username`}
              size={isMobile ? "small" : "medium"}
            />
            
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              By connecting your account, you agree to our terms of service and privacy policy.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleConnect} 
            variant="contained"
            disabled={!username.trim()}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default SocialMediaConnect;
