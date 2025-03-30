document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const connectWalletBtn = document.querySelector('.connect-wallet');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Connect Wallet functionality
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', async function() {
            try {
                // Check if MetaMask is installed
                if (typeof window.ethereum !== 'undefined') {
                    // Request account access
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const account = accounts[0];
                    
                    // Update button text with shortened address
                    const shortenedAddress = `${account.slice(0, 6)}...${account.slice(-4)}`;
                    this.innerHTML = `<i class="fas fa-wallet"></i><span>${shortenedAddress}</span>`;
                    this.classList.add('connected');
                    
                    // Listen for account changes
                    window.ethereum.on('accountsChanged', function(accounts) {
                        if (accounts.length === 0) {
                            // User disconnected
                            connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i><span>Connect Wallet</span>';
                            connectWalletBtn.classList.remove('connected');
                        } else {
                            // Account changed
                            const newAccount = accounts[0];
                            const shortenedAddress = `${newAccount.slice(0, 6)}...${newAccount.slice(-4)}`;
                            connectWalletBtn.innerHTML = `<i class="fas fa-wallet"></i><span>${shortenedAddress}</span>`;
                        }
                    });
                } else {
                    // MetaMask is not installed
                    alert('Please install MetaMask to use this feature!');
                    window.open('https://metamask.io/download/', '_blank');
                }
            } catch (error) {
                console.error('Error connecting wallet:', error);
                alert('Failed to connect wallet. Please try again.');
            }
        });
    }

    // Handle account changes
    if (window.ethereum) {
        window.ethereum.on('chainChanged', function() {
            window.location.reload();
        });
    }
}); 