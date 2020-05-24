import React from 'react'
import ReactDOM from 'react-dom'

// Available attributes: menuClass="abc", itemsClass="menu-items", itemClass="menu-item", onClose="()=>{}" floating={ false }
export class ActionMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    static defaultProps = {
        floating: false,
        defaultClass: "menu-item"
    }

    menuDomRef

    componentWillMount() {
        document.addEventListener('click', this.closeMenu, false)
    }

    toggleMenu = event => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    closeMenu = event => {
        if(this.menuDomRef.contains(event.target))
        this.setState({ isOpen: false })
    }

    menuHtml = () => {
        console.log(this.menuDomRef)
        return(
            this.state.isOpen && <div className={`menu-items${this.props.itemsClass ? ' ' + this.props.itemsClass : ''}`} ref={r => {this.menuDomRef = r}}>
                {this.props.children.map((menu, key) => (
                    <Menu
                        onClose={this.closeMenu}
                        key={key}
                        setClass={
                            (this.props.itemClass ? this.props.itemClass : this.props.defaultClass) +
                            (menu.props.setClass ? ' ' + menu.props.setClass : '')
                        }
                        onAction={menu.props.onAction ? menu.props.onAction : null }
                    >
                        {menu.props.children}
                    </Menu>
                ))}
            </div>
        )
    }

    render() {
        return(
            <div className={`action-menu${this.props.menuClass ? ' ' + this.props.menuClass : ''}${this.state.isOpen ? ' active' : ''}`}>
                <span className="menu-button" onClick={this.toggleMenu}><i className="icon-ellips-h"></i></span>
                {this.props.floating ? ReactDOM.createPortal(this.menuHtml(), document.body) : this.menuHtml()}
            </div>
        )
    }
}

// Available attributes: setClass="abc", onAction={()=>{}}
export class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    menuClose = () => {
        this.props.onClose && this.props.onClose()
        this.props.onAction && this.props.onAction()
    }

    render() {
        return (
            <div className={this.props.setClass} onClick={this.menuClose}>
                {this.props.children}
            </div>
        )
    }
}