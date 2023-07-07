## Otra manera de enrutar
```
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/my-account' element={<MyAccount />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/my-order' element={<MyOrder />} />
            <Route path='/my-orders' element={<MyOrders />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
```