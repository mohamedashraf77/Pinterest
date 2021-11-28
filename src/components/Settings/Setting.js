import React from 'react'
import { Link, Route } from 'react-router-dom'
import './Setting.css'
import PublicProfile from './PublicProfile';
import AccountSettings from './AccountSettings';
// import HomeFeedTuner from './HomeFeedTuner';
// import Claim from './Claim';
// import Notifications from './Notifications';
// import PrivacyData from './PrivacyData';
// import Security from './Security';
// import Apps from './Apps';
import { Box , Grid} from '@mui/material';

const Settings = () => {
    return (
        <div className="setting">
            
            
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                    <div className="side-bar">
                <div className="side-bar-link">
                    <Link className="nav-link" to="/setting/public_profile">Public profile</Link>
                    <Link className="nav-link" to="/setting/account_settings">Account settings</Link>
                    {/* <Link className="nav-link" to="/setting/home_feed">Home feed tuner</Link> 
                    <Link className="nav-link" to="/setting/claim">Claim</Link> 
                    <Link className="nav-link" to="/setting/notifications">Notifications</Link> 
                    <Link className="nav-link" to="/setting/privacy_data">Privacy and data</Link> 
                    <Link className="nav-link" to="/setting/security">Security</Link> 
                    <Link className="nav-link" to="/setting/apps">Apps</Link>  */}
                </div>
            </div>
                    </Grid>
                    <Grid item xs={6}>
                    <div className="main-page">
                <div className="body">
                    <Route path='/setting/public_profile' component={PublicProfile} />
                    <Route path='/setting/account_settings' component={AccountSettings} />
                    {/* <Route path='/setting/home_feed' component={HomeFeedTuner}/>
                <Route path='/setting/claim' component={Claim}/>
                <Route path='/setting/notifications' component={Notifications}/>
                <Route path='/setting/privacy_data' component={PrivacyData}/>
                <Route path='/setting/security' component={Security}/>
                <Route path='/setting/apps' component={Apps}/> */}
                </div>
            </div>
                    </Grid>
                </Grid>
            </Box>
        </div>

    )
}
export default Settings;