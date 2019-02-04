package com.ibm.test.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ibm.test.Interface.BankCardServiceLocal;
import com.ibm.test.Model.BankCard;

@Controller
@RequestMapping("/bankCard")
public class BankCardController {

	@Autowired
	BankCardServiceLocal bankCardServiceLocal;

	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody BankCard bankCard) {
		if (bankCard != null) {
			if (bankCardServiceLocal.createAndUpdate(bankCard)) {
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.badRequest().build();
			}
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping("/edit")
	public ResponseEntity<?> edit(@RequestBody BankCard bankCard) {
		if (bankCard != null) {
			if (bankCardServiceLocal.createAndUpdate(bankCard)) {
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.badRequest().build();
			}
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") long bankCardId) {
		if (bankCardServiceLocal.delete(bankCardId)) {
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.badRequest().build();
		}

	}

	@GetMapping("/findAll")
	@ResponseBody
	public ResponseEntity<List<BankCard>> findAll() {
		List<BankCard> bankCards = bankCardServiceLocal.findAll();
		if (bankCards != null) {
			return ResponseEntity.ok(bankCards);
		} else {
			return ResponseEntity.noContent().build();
		}
	}

	@GetMapping("/find/{id}")
	@ResponseBody
	public ResponseEntity<BankCard> find(@PathVariable("id") long bankCardId) {
		BankCard card = bankCardServiceLocal.find(bankCardId);
		if (card != null) {
			return ResponseEntity.ok(card);
		} else {
			return ResponseEntity.noContent().build();
		}
	}

	@GetMapping("/findByCustomerId/{id}")
	@ResponseBody
	public ResponseEntity<List<BankCard>> findByCustomerId(@PathVariable("id") long customerId) {
		List<BankCard> cards = bankCardServiceLocal.findByCustomerId(customerId);
		if (cards != null) {
			return ResponseEntity.ok(cards);
		} else {
			return ResponseEntity.noContent().build();
		}
	}
}
