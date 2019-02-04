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

import com.ibm.test.Interface.CardConsumptionServiceLocal;
import com.ibm.test.Model.CardConsumption;

@Controller
@RequestMapping("/cardConsumption")
public class CardConsumptionController {

	@Autowired
	CardConsumptionServiceLocal cardConsumptionServiceLocal;

	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody CardConsumption cardConsumption) {
		if (cardConsumption != null) {
			if (cardConsumptionServiceLocal.createAndUpdate(cardConsumption)) {
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.badRequest().build();
			}
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping("/edit")
	public ResponseEntity<?> edit(@RequestBody CardConsumption cardConsumption) {
		if (cardConsumption != null) {
			if (cardConsumptionServiceLocal.createAndUpdate(cardConsumption)) {
				return ResponseEntity.ok(true);
			} else {
				return ResponseEntity.badRequest().build();
			}
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable("id") long cardConsumptionId) {
		if (cardConsumptionServiceLocal.delete(cardConsumptionId)) {
			return ResponseEntity.ok(true);
		} else {
			return ResponseEntity.badRequest().build();
		}

	}

	@GetMapping("/findAll")
	@ResponseBody
	public ResponseEntity<List<CardConsumption>> findAll() {
		List<CardConsumption> cardConsumptions = cardConsumptionServiceLocal.findAll();
		if (cardConsumptions != null) {
			return ResponseEntity.ok(cardConsumptions);
		} else {
			return ResponseEntity.noContent().build();
		}
	}

	@GetMapping("/find/{id}")
	@ResponseBody
	public ResponseEntity<CardConsumption> find(@PathVariable("id") long cardConsumptionId) {
		CardConsumption cardConsumption = cardConsumptionServiceLocal.find(cardConsumptionId);
		if (cardConsumption != null) {
			return ResponseEntity.ok(cardConsumption);
		} else {
			return ResponseEntity.noContent().build();
		}
	}

	@GetMapping("/findByBankCardId/{id}")
	@ResponseBody
	public ResponseEntity<List<CardConsumption>> findByCustomerId(@PathVariable("id") long bankCardId) {
		List<CardConsumption> cards = cardConsumptionServiceLocal.findByBankCardId(bankCardId);
		if (cards != null) {
			return ResponseEntity.ok(cards);
		} else {
			return ResponseEntity.noContent().build();
		}
	}
}
