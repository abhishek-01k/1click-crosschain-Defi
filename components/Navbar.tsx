import React from 'react';
import { createThirdwebClient } from 'thirdweb';
import { ConnectButton } from 'thirdweb/react';

const Navbar = () => {
    const client = createThirdwebClient({ clientId: "9dbaca0c09760c29ab2aec57240823c9" });

    return (
        <div>
            <ConnectButton client={client} />
        </div>
    );
};

export default Navbar;