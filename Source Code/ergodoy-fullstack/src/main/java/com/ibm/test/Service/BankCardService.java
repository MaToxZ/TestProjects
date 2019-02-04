package com.ibm.test.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ibm.test.Interface.BankCardServiceLocal;
import com.ibm.test.Model.BankCard;
import com.ibm.test.Repository.BankCardRepository;

@Service
public class BankCardService implements BankCardServiceLocal {
	
	@Autowired
	BankCardRepository bankCardRepository;

        /**
         * This method is used to create or update a BankCard in DataBase, if the BankCard object contains and bcIdPk attribute
         * the incoming object will be updated otherwise will be created
         * @param bankCard BankCard Object (POJO)
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean createAndUpdate(BankCard bankCard) {
		if(bankCardRepository.save(bankCard) != null) {
			return true;
		}else {
			return false;
		}
	}

        /**
         * This method is use to delete a BankCard in DataBase.
         * @param bankCardId BankCard ID to be Deleted
         * @return <code> true : false </code> depending if the transaction was successfully or failed.
         */
	@Override
	public boolean delete(long bankCardId) {
		try {
			bankCardRepository.deleteById(bankCardId);
			return true;
		}catch(Exception e) {
			return false;
		}
	}

        /**
         * This method retrieve all the BankCard in DataBase.
         * @return <code> BankCard[] : null </code> depending on DataBase match. 
         */
	@Override
	public List<BankCard> findAll() {
		List<BankCard> bankCards = (List<BankCard>) bankCardRepository.findAll();
		if(bankCards != null && bankCards.size() > 0) {
			return bankCards;
		}else {
			return null;
		}
	}

        /**
         * This method finds a BankCard in BataBase based in the sent parameter
         * @param bankCardId BankCard ID to find
         * @return <code> BankCard : null </code> depending on DataBase match
         */
	@Override
	public BankCard find(long bankCardId) {
		return bankCardRepository.findById(bankCardId).orElse(null);
	}

        /**
         * This method retrieve all BankCards associated to a customer ID
         * @param customerId Customer ID associated to BankCards
         * @return <code> BankCard[] : null </code> depending on DataBase match
         */
	@Override
	public List<BankCard> findByCustomerId(long customerId) {
		List<BankCard> bankCards = (List<BankCard>) bankCardRepository.findByCustomerId(customerId);
		if(bankCards != null && bankCards.size() > 0) {
			return bankCards;
		}else {
			return null;
		}
	}

	
}
