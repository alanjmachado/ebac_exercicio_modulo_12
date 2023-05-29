/// <reference types="cypress" />
const perfil = require("../fixtures/perfil.json");
import ProdutoAdicionar from '../support/page_objects/produto.page'
const produtosArquivo = require('../fixtures/produto.json')

context("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
  /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

  beforeEach(() => {
    cy.visit("minha-conta");
    cy.get("#username").type(perfil.usuario);
    cy.get("#password").type(perfil.senha, { log: false });
    cy.get(".woocommerce-form > .button").click();
    cy.get("#primary-menu > .menu-item-629 > a").click();
  });

  it("Deve fazer um pedido na loja Ebac Shop - usando Class", () => {
    ProdutoAdicionar.adicionarProduto('Abominable Hoodie', 'XS', 'Blue', 1);
    ProdutoAdicionar.adicionarProduto('Atlas Fitness Tank', 'XS', 'Blue', 1);
    ProdutoAdicionar.adicionarProduto('Atomic Endurance Running Tee (V-neck)', 'XS', 'Blue', 1);
    ProdutoAdicionar.adicionarProduto('Augusta Pullover Jacket', 'XS', 'Blue', 1);
    ProdutoAdicionar.adicionarProduto('Beaumont Summit Kit', 'XS', 'Orange', 1);
    cy.get(".dropdown-toggle > .text-skin > .icon-basket").click();
    cy.get("#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout").click();
    cy.get(".woocommerce-terms-and-conditions-checkbox-text").click({force: true,});
    cy.wait(3000);
    cy.get("#place_order").click();
    cy.wait(8000);
    cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.');
  });

  it("Deve fazer um pedido na loja Ebac Shop - usando Commands", () => {
    cy.produtoCarrinho('Abominable Hoodie', 'XS', 'Blue', 1)
    cy.produtoCarrinho('Atlas Fitness Tank', 'XS', 'Blue', 1)
    cy.produtoCarrinho('Atomic Endurance Running Tee (V-neck)', 'XS', 'Blue', 1)
    cy.produtoCarrinho('Augusta Pullover Jacket', 'XS', 'Blue', 1)
    cy.produtoCarrinho('Beaumont Summit Kit', 'XS', 'Orange', 1)
    //Checkout
    cy.get(".dropdown-toggle > .text-skin > .icon-basket").click();
    cy.get("#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout").click();
    cy.get(".woocommerce-terms-and-conditions-checkbox-text").click({force: true,});
    cy.wait(3000);
    cy.get("#place_order").click();
    cy.wait(8000);
    cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.');
  });

  it("Deve fazer um pedido na loja Ebac Shop - usando arquivo de dados", () => {
    ProdutoAdicionar.adicionarProduto(
      produtosArquivo[0].produto,
      produtosArquivo[0].tamanho,
      produtosArquivo[0].cor,
      produtosArquivo[0].quantidade),
    ProdutoAdicionar.adicionarProduto(
      produtosArquivo[1].produto,
      produtosArquivo[1].tamanho,
      produtosArquivo[1].cor,
      produtosArquivo[1].quantidade),
    ProdutoAdicionar.adicionarProduto(
      produtosArquivo[2].produto,
      produtosArquivo[2].tamanho,
      produtosArquivo[2].cor,
      produtosArquivo[2].quantidade),    
    ProdutoAdicionar.adicionarProduto(
      produtosArquivo[3].produto,
      produtosArquivo[3].tamanho,
      produtosArquivo[3].cor,
      produtosArquivo[3].quantidade),
    ProdutoAdicionar.adicionarProduto(
      produtosArquivo[4].produto,
      produtosArquivo[4].tamanho,
      produtosArquivo[4].cor,
      produtosArquivo[4].quantidade,
    );
    cy.get(".dropdown-toggle > .text-skin > .icon-basket").click();
    cy.get("#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout").click();
    cy.get(".woocommerce-terms-and-conditions-checkbox-text").click({force: true,});
    cy.wait(3000);
    cy.get("#place_order").click();
    cy.wait(8000);
    cy.get('.woocommerce-notice').should('contain' , 'Obrigado. Seu pedido foi recebido.');
  }); 


});
