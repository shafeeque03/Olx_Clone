import React from 'react'
import './NavBar.css'
const NavBar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand logo" href="#">
        <img src='https://logos-world.net/wp-content/uploads/2022/04/OLX-Logo.png' />
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav flex-2 pr-3">

            <li class="input-group input-group-lg location mr-4 flex-1">
                <input type="text" class="form-control" placeholder="India" />
                <div class="input-group-btn">
                    <button class="fas fa-search ico"></button>
                </div>
            </li>

            <li class="input-group input-group-lg search flex-2">

                <input type="text" class="form-control" placeholder="Find Mobile, Car ,laptop" />
                <div class="input-group-btn">
                    <button class="fas fa-search ico"></button>
                </div>
            </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
            <h6 class="mr-sm-2 login" >Login</h6>
            <button class="my-2 my-sm-0 fas fa-plus sell">&nbsp; SELL</button>
        </form>
    </div>
</nav>
    </div>
  )
}

export default NavBar
