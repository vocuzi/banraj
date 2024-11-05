import { useState } from 'react';
import "./style.css"

export default function AccountsSection() {
  const [activeTab, setActiveTab] = useState('#update-profile');
  const [username, setUsername] = useState('Rosie');
  const [address, setAddress] = useState({
    street: '3522 Interstate 75 Business Spur',
    city: 'Sault Ste. Marie, Mi 49783',
    state: 'Michigan',
    country: 'USA'
  });

  const tabs = [
    { id: '#update-profile', label: 'Update Profile', icon: 'fi fi-rs-user' },
    { id: '#dashboard', label: 'Dashboard', icon: 'fi fi-rs-settings-sliders' },
    { id: '#orders', label: 'Orders', icon: 'fi fi-rs-shopping-bag' },
    { id: '#change-password', label: 'Change Password', icon: 'fi fi-rs-settings-sliders' },
    { id: '#logout', label: 'Logout', icon: 'fi fi-rs-exit' },
  ]

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile and Address updated!');
    // You would handle updating the profile and address here (send data to backend or API).
  };

  return (
    <section className="accounts section--lg">
      <div className="accounts__container container grid">
        <div className="account__tabs">
          {tabs.map((tab, index) => (
            <p
              className={`account__tab ${activeTab === tab.id ? 'active-tab' : ''}`}
              data-target={tab.id}
              onClick={() => handleTabClick(tab.id)}
              key={index}
            >
              <i className={tab.icon}></i>
              <b>{tab.label}</b>
            </p>
          ))}
        </div>
        <div className="tabs__content">
          {/* Update Profile and Address Form */}
          <div
            className={`tab__content ${activeTab === '#update-profile' ? 'active-tab' : ''}`}
            id="update-profile"
          >
            <h3 className="tab__header">Update Profile & Address</h3>
            <div className="tab__body">
              <form className="form grid" onSubmit={handleProfileUpdate}>
                {/* Username Field */}
                <div className="form__field">
                  <label htmlFor="username" className="form__label">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="form__input"
                  />
                </div>

                {/* Address Fields */}
                <div className="form__field">
                  <label htmlFor="street" className="form__label">Street Address</label>
                  <input
                    type="text"
                    id="street"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="Street Address"
                    className="form__input"
                  />
                </div>
                <div className="form__field">
                  <label htmlFor="city" className="form__label">City</label>
                  <input
                    type="text"
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="City"
                    className="form__input"
                  />
                </div>
                <div className="form__field">
                  <label htmlFor="state" className="form__label">State</label>
                  <input
                    type="text"
                    id="state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    placeholder="State"
                    className="form__input"
                  />
                </div>
                <div className="form__field">
                  <label htmlFor="country" className="form__label">Country</label>
                  <input
                    type="text"
                    id="country"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    placeholder="Country"
                    className="form__input"
                  />
                </div>

                {/* Save Button */}
                <div className="form__btn">
                  <button className="btn btn--md" type="submit">Save Changes</button>
                </div>
              </form>
            </div>
          </div>

          {/* Dashboard Tab */}
          <div
            className={`tab__content ${activeTab === '#dashboard' ? 'active-tab' : ''}`}
            id="dashboard"
          >
            <h3 className="tab__header">Hello {username}</h3>
            <div className="tab__body">
              <p className="tab__description">
                From your account dashboard, you can easily check & view your recent order, manage your shipping and billing addresses, and edit your password and account details.
              </p>
            </div>
          </div>

          {/* Orders Tab */}
          <div
            className={`tab__content ${activeTab === '#orders' ? 'active-tab' : ''}`}
            id="orders"
          >
            <h3 className="tab__header">Your Orders</h3>
            <div className="tab__body">
              <table className="placed__order-table">
                <thead>
                  <tr>
                    <th>Orders</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Totals</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1357</td>
                    <td>March 19, 2022</td>
                    <td>Processing</td>
                    <td>$125.00</td>
                    <td><a href="#" className="view__order">View</a></td>
                  </tr>
                  <tr>
                    <td>#2468</td>
                    <td>June 29, 2022</td>
                    <td>Completed</td>
                    <td>$364.00</td>
                    <td><a href="#" className="view__order">View</a></td>
                  </tr>
                  <tr>
                    <td>#2366</td>
                    <td>August 02, 2022</td>
                    <td>Completed</td>
                    <td>$280.00</td>
                    <td><a href="#" className="view__order">View</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Change Password Tab */}
          <div
            className={`tab__content ${activeTab === '#change-password' ? 'active-tab' : ''}`}
            id="change-password"
          >
            <h3 className="tab__header">Change Password</h3>
            <div className="tab__body">
              <form className="form grid">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="form__input"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="form__input"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form__input"
                />
                <div className="form__btn">
                  <button className="btn btn--md">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}