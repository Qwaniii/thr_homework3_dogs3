const onResponce = (res) => {
    // return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
    return res.ok ? res.json() : Promise.reject(res);
}

class Api {

    constructor({ dataUrl, token }) {
        this._dataUrl = dataUrl;
        this._token = `Bearer ${token}`
        // this._token = `${token}`
    }

    //Получение списка продуктов

    // setToken(token) {
    //     this._token = `Bearer ${token}`
    // }

    getProductList() {
        return fetch(`${this._dataUrl}/products?limit=600`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce);
    }

    addNewProduct(data) {
        return fetch(`${this._dataUrl}/products`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    editProduct(data, productID) {
        return fetch(`${this._dataUrl}/products/${productID}`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    getProductPaginateList(page, limit, searchQuery) {
        // return fetch(`${this._dataUrl}/products?page=${page}&limit=${limit}&query=${searchQuery}`, {
        return fetch(`${this._dataUrl}/products?page=${page}&limit=${limit}&query=${searchQuery}`, {
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
        }).then(onResponce);
    }

    getProductById(prodId) {
        return fetch(`${this._dataUrl}/products/${prodId}`, {
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
        }).then(onResponce)
    }

    // Получение информации о пользователе 

    getUserInfo() {
        return fetch(`${this._dataUrl}/users/me`, {
            headers: {
                authorization: this._token,
            },
        }).then(onResponce);
    }

    editUserInfo(data) {
        return fetch(`${this._dataUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    editUserAvatar(avatar) {
        return fetch(`${this._dataUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(avatar) 
        }).then(onResponce)
    }

    getReviewAuthor(authorId) {
        return fetch(`${this._dataUrl}/users/${authorId}`, {
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce)
    }

    sendReview(productId, body) {
        return fetch(`${this._dataUrl}/products/review/${productId}`, {
            method: "POST",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(onResponce)
    }

    getAllReview() {
        return fetch(`${this._dataUrl}/products/review`, {
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce)
    }

    deleteReview(prodId, reviewId) {
        return fetch(`${this._dataUrl}/products/review/${prodId}/${reviewId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            }
        }).then(onResponce)
    }

    signIn(data) {
        return fetch(`${this._dataUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    signUp(data) {
        return fetch(`${this._dataUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(onResponce)
    }

    forgotPassword(email) {
        return fetch(`${this._dataUrl}/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(email)
        }).then(onResponce)
    }

    resetPassword(newPassword, newToken) {
        return fetch(`${this._dataUrl}/password-reset/${newToken}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newPassword)
        }).then(onResponce)
    }

    //change info about user

    setUserInfo({ name, about }) {
        return fetch(`${this._dataUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                about,
            })
        }).then(onResponce);
    }

    // Получать данные только вместе

    // getAppInfo() {
    //     return Promise.all([this.getProductList(), this.getUserInfo()]);
    // }
    
    // получаем данные с сервера с пагинацией 
    getAppInfo(page, limit, searchQuery) {
        return Promise.all([this.getProductPaginateList(page, limit, searchQuery), this.getUserInfo()]);
    }
    
    search(searchQuery) {
        return fetch(`${this._dataUrl}/products/search?query=${searchQuery}`, {
            headers: {
                authorization: this._token,
            }
        }).then(onResponce);
    }

	changeLikeProductStatus(productID, like) {
		// Обычная реализация: 2 разных метода для удаления и постановки лайка.
		return fetch(`${this._dataUrl}/products/likes/${productID}`, {
			method: like ? "PUT" : "DELETE",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
		}).then(onResponce);
	}


}

const config = {
    dataUrl: 'https://api.react-learning.ru',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UyMTgxNzU5Yjk4YjAzOGY3N2IyN2MiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNzIzODA2NTI5LCJleHAiOjE3NTUzNDI1Mjl9.WD0YlaNdg1RiemhrN-FCg1k02oRh4_CqLxd2c4XP270"
    // token: sessionStorage.getItem('token') || ""
}

const api = new Api(config)

export default api