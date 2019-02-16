import React from 'react';
import { withRouter } from 'react-router';
import firebase, { getDataFromCollection } from '../config/firebase';
import routes from '../constants/routes';
import { connect } from 'react-redux';
import { projectLoadFromCloud, taskLoadFromCloud, userSaveUser } from '../store/actions';
import { COLLECTION_PROJECTS, COLLECTION_TASKS } from '../config/firebase-env';
import Loader from '../components/Loader/Loader';


export default function requireAuth(Component) {

  class AuthenticatedComponent extends React.Component {
    _isMounted = false;

    state = {
      isLogged: false,
      isLoading: false
    };


    componentDidMount() {
      // prevent set state on unmounted comp
      this._isMounted = true;

      if(!this.props.userStore.isLogged) {
        this.checkAuth().then(() => {
          if(this._isMounted) {
            this.setState({ isLogged: true });
          }
        }).catch(() => {
          if(this._isMounted) {
            this.denyAccess();
          }
        });
      } else {
        this.setState({ isLogged: true });
      }
    }

    componentWillReceiveProps(props) {
      if (!props.userStore.isLogged) {
        this.denyAccess();
      }
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    syncWithCloud = (uuid) => {
      return new Promise((resolve) => {
        this._loadCollectionFromCloud(uuid, COLLECTION_PROJECTS, this.props).then(() => {
          this._loadCollectionFromCloud(uuid, COLLECTION_TASKS, this.props).then(() => {
            resolve();
          });
        });
      });
    };

    checkAuth() {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user && this._isMounted) {
            this.setState({isLoading: true}, () => {
              this.syncWithCloud(user.uid).then(() => {
                this.props.saveUser(user);
                this.setState({isLoading: false}, () => resolve());
              });
            })
          } else {
            reject();
          }
        });
      });
    }

    denyAccess = () => {
      this.setState({
        isLogged: false
      }, () => {
        this.props.history.push(routes.LOGIN);
      });
    };

    render() {
      if (this.state.isLoading) {
        return  <Loader type="spinningBubbles" color="#52cc1f"/>;
      }

      return this.state.isLogged
        ? <Component {...this.props} />
        : null;
    }


    _loadCollectionFromCloud = (uuid, collection, props) => {
      return new Promise((resolve) => {
        getDataFromCollection(uuid, collection).then((querySnapshot) => {
          querySnapshot.forEach(function(doc) {
            const data = doc.data();
            if (data) {
              if (collection === COLLECTION_PROJECTS) {
                props.saveProject(data);
              } else if (collection === COLLECTION_TASKS) {
                props.saveTask(data);
              }
            }
          });
          resolve();
        });
      });
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      saveUser: (user) => dispatch(userSaveUser(user)),
      saveProject: (project) => dispatch(projectLoadFromCloud(project)),
      saveTask: (task) => dispatch(taskLoadFromCloud(task))
    };
  };

  const mapStateToProps = (state) => {
    return {
      userStore: state.userStore
    };
  };


  return withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent));
}
