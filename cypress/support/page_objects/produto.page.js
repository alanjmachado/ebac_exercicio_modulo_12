class Produto {

    adicionarProduto(produto, tamanho, cor, quantidade){
    cy.get('[class="product-block grid"]').contains(produto).click();
    cy.get('.button-variable-item-'+ tamanho).click()
    cy.get('.button-variable-item-'+ cor).click()
    cy.get(".input-text").clear().type(quantidade);
    cy.get(".single_add_to_cart_button").click();
    cy.get("#primary-menu > .menu-item-629 > a").click();
    cy.get(":nth-child(2) > .page-numbers").click();
    }

}

export default new Produto()